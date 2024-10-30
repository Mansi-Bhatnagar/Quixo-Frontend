import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../Redux/AuthenticationSlice";
import { createNewPassword, forgetPassword, login } from "../Services/Auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import loginPageLogo from "../Assets/Images/QuixoLogo.png";
import emailIcon from "../Assets/Images/material-email.svg";
import hide from "../Assets/Images/material-visibility-off.svg";
import show from "../Assets/Images/material-remove-red-eye.svg";
import check from "../Assets/Images/material-check.svg";
import illustration from "../Assets/Images/illustration.webp";

const Login = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extracting values
  const token = queryParams.get("token");
  const linkEmail = queryParams.get("email");
  const workspaceId = queryParams.get("workspace_id");

  //Email Regex
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Password Regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //States
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem("Quixo"))?.checked ? true : false
  );
  const [email, setEmail] = useState(linkEmail || "");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginBtnDisable, setLoginBtnDisable] = useState(true);
  const [newPasswordBtnDisable, setNewPasswordBtnDisable] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPwdScreen, setForgetPwdScreen] = useState(false);
  const [otp, setOtp] = useState("");

  //Checkers
  const checkEmail = (email) => {
    if (email.trim() === "") {
      setEmailError("Email cannot be empty");
    } else {
      const result = emailRegex.test(email);
      if (!result) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    }
  };

  const checkPassword = (password) => {
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
    } else {
      const result = passwordRegex.test(password);
      if (!result) {
        setPasswordError(
          "Password must contain atleast 8 characters with 1 uppercase, 1 lowercase, 1 no. & 1 special character"
        );
      } else {
        setPasswordError("");
      }
    }
  };

  //Handlers
  const rememberPasswordHandler = () => {
    setChecked((prev) => !prev);
  };

  const signUpHandler = () => {
    navigate("/signup");
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    checkEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    checkPassword(e.target.value);
  };

  const otpHandler = (e) => {
    setOtp(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  const forgetPasswordHandler = () => {
    forgetPasswordMutaion.mutate();
  };

  const createNewPasswordHandler = (e) => {
    e.preventDefault();
    createNewPasswordMutation.mutate();
  };

  // APIs
  const loginMutation = useMutation({
    mutationFn: () => login(email, password, token, workspaceId),
    onSuccess: (response) => {
      navigate("/dashboard");
      if (checked) {
        localStorage.setItem(
          "Quixo",
          JSON.stringify({ email: email, password: password, checked: true })
        );
      }
      localStorage.setItem("jwt", response?.data?.token || "");
      dispatch(authenticationActions.updateJWT(response?.data?.token || ""));
      localStorage.setItem("username", response?.data?.username);
      localStorage.setItem("email", response?.data?.email);
      localStorage.setItem("userId", response?.data?.id);
      localStorage.setItem("userColor", response?.data?.user_color);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.response?.data?.error || "Error. Try Again");
      if (
        error?.response?.data?.error ===
        "User does not exist, please sign up first"
      ) {
        navigate("/signup");
      }
    },
  });

  const forgetPasswordMutaion = useMutation({
    mutationFn: () => forgetPassword(email),
    onSuccess: (response) => {
      setForgetPwdScreen(true);
      setPassword("");
      setOtp("");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.response?.data?.error || "Error. Try Again");
      if (
        error?.response?.data?.error ===
        "User does not exist, please sign up first"
      ) {
        navigate("/signup");
      }
    },
  });

  const createNewPasswordMutation = useMutation({
    mutationFn: () => createNewPassword(email, password, otp),
    onSuccess: (response) => {
      setForgetPwdScreen(false);
      toast.success("Password reset successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.response?.data?.error || "Error. Try Again");
    },
  });

  //Effects
  useEffect(() => {
    if (!emailError && !passwordError && email && password) {
      setLoginBtnDisable(false);
    }
  }, [emailError, passwordError, email, password]);

  useEffect(() => {
    if (!passwordError && password) {
      setNewPasswordBtnDisable(false);
    }
  }, [passwordError, password]);

  useEffect(() => {
    if (!linkEmail && checked) {
      setEmail(JSON.parse(localStorage.getItem("Quixo")).email);
      setPassword(JSON.parse(localStorage.getItem("Quixo")).password);
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <img
        src={loginPageLogo}
        alt="logo"
        className="absolute left-5 top-5 h-[50px] w-auto"
      />
      <div className="mt-6 flex items-center rounded-2xl shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] max-sm:shadow-none">
        <form className="animate-Morph px-16 py-8 max-lg:px-5 max-sm:px-4 [&_h2]:mb-0 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#03045eff] [&_h4]:mt-2 [&_h4]:text-xl [&_h4]:text-[#bcc1caff] [&_label]:text-lg [&_label]:text-[#03045eff]">
          <h2 className="w-[335px] text-center">Login</h2>
          {forgetPwdScreen ? (
            <>
              <div className="mt-5">
                <div>
                  <label htmlFor="otp">Enter OTP</label>
                  <div className="mt-2 flex w-[335px] items-center justify-between rounded-3xl border-2 border-[#03045eff]">
                    <input
                      type="text"
                      placeholder="OTP"
                      id="otp"
                      value={otp}
                      onChange={otpHandler}
                      className="ml-5 w-[calc(100%_-_75px)] border-none px-0 py-3 placeholder:text-sm placeholder:text-[#03045eff] focus-visible:outline-none"
                    />
                  </div>
                </div>
                <span className="text-base text-[#bcc1caff]">
                  * OTP sent to entered email
                </span>
              </div>
              <div className="mt-5">
                <label htmlFor="new-password">New Password</label>
                <div className="mt-2 flex w-[335px] items-center justify-between rounded-3xl border-2 border-[#03045eff]">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter New Password"
                    id="new-password"
                    autoComplete="true"
                    onChange={passwordHandler}
                    value={password}
                    className="ml-5 w-[calc(100%_-_75px)] border-none px-0 py-3 placeholder:text-sm placeholder:text-[#03045eff] focus-visible:outline-none"
                  />
                  <img
                    src={showPassword ? show : hide}
                    alt="visibility-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                    className="mr-5 h-6 w-6"
                  />
                </div>
                {passwordError ? (
                  <span className="block w-[338px] text-sm text-[#d00000]">
                    {"* " + passwordError}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <button
                className="mb-12 mt-4 w-[335px] cursor-pointer rounded-3xl border-none bg-[#03045eff] py-2 text-lg text-white transition-all duration-500 ease-in-out hover:scale-95 hover:bg-[#0508baff] hover:transition-all hover:duration-500 hover:ease-in-out hover:active:bg-[#1519f8ff] disabled:cursor-not-allowed disabled:opacity-40"
                disabled={newPasswordBtnDisable}
                onClick={createNewPasswordHandler}
              >
                Create
              </button>
            </>
          ) : (
            <>
              <h4 className="w-[335px] text-center">Welcome Back</h4>
              <div className="mt-5">
                <label htmlFor="email">Email</label>
                <div className="mt-2 flex w-[335px] items-center justify-between rounded-3xl border-2 border-[#03045eff]">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    onChange={emailHandler}
                    value={email}
                    className="ml-5 w-[calc(100%_-_75px)] border-none px-0 py-3 placeholder:text-sm placeholder:text-[#03045eff] focus-visible:outline-none"
                    disabled={linkEmail}
                    title={linkEmail ? "Email can not be changed" : ""}
                    style={{ cursor: linkEmail ? "not-allowed" : "auto" }}
                  />
                  <img
                    src={emailIcon}
                    alt="email-icon"
                    className="mr-5 h-6 w-6"
                  />
                </div>
                {emailError ? (
                  <span className="block w-[338px] text-sm text-[#d00000]">
                    {"* " + emailError}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="password">Password</label>
                <div className="mt-2 flex w-[335px] items-center justify-between rounded-3xl border-2 border-[#03045eff]">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    id="password"
                    autoComplete="true"
                    onChange={passwordHandler}
                    value={password}
                    className="ml-5 w-[calc(100%_-_75px)] border-none px-0 py-3 placeholder:text-sm placeholder:text-[#03045eff] focus-visible:outline-none"
                  />
                  <img
                    src={showPassword ? show : hide}
                    alt="visibility-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                    className="mr-5 h-6 w-6"
                  />
                </div>
                {passwordError ? (
                  <span className="block w-[338px] text-sm text-[#d00000]">
                    {"* " + passwordError}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-5 flex w-[335px] items-center justify-between [&_span]:text-base [&_span]:text-[#bcc1caff] [&_span]:hover:cursor-pointer">
                <div className="flex items-center justify-start gap-1 [&_div]:flex [&_div]:items-center [&_div]:justify-center">
                  <div
                    className="h-[18px] w-[18px] rounded-md border-2 border-[#03045eff]"
                    onClick={rememberPasswordHandler}
                  >
                    {checked ? <img src={check} alt="check" /> : ""}
                  </div>
                  <span
                    className="hover:underline"
                    onClick={rememberPasswordHandler}
                  >
                    Remember Me
                  </span>
                </div>
                <span
                  className="hover:underline"
                  onClick={forgetPasswordHandler}
                >
                  Forget Password?
                </span>
              </div>
              <button
                className="my-4 w-[335px] cursor-pointer rounded-3xl border-none bg-[#03045eff] py-2 text-lg text-white transition-all duration-500 ease-in-out hover:scale-95 hover:bg-[#0508baff] hover:transition-all hover:duration-500 hover:ease-in-out hover:active:bg-[#1519f8ff] disabled:cursor-not-allowed disabled:opacity-40"
                disabled={loginBtnDisable}
                onClick={loginHandler}
              >
                {loginMutation.isPending || forgetPasswordMutaion.isPending
                  ? "Processing..."
                  : "Login"}
              </button>
              <h6 className="w-[335px] text-center text-base text-[#bcc1caff]">
                Don't have an account?{" "}
                <span
                  onClick={signUpHandler}
                  className="hover:cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </h6>
            </>
          )}
        </form>
        <div className="animate-Morph max-md:hidden">
          <img
            className="h-[494px] w-[500px] rounded-br-2xl rounded-tr-2xl object-cover max-lg:w-[350px]"
            src={illustration}
            alt="login-background"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
