import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../Redux/AuthenticationSlice";
import { createUser, verifyOTP } from "../Services/Auth";
import { toast } from "react-toastify";
import userIcon from "../Assets/Images/material-perm-identity.svg";
import loginPageLogo from "../Assets/Images/QuixoLogo.png";
import emailIcon from "../Assets/Images/material-email.svg";
import hide from "../Assets/Images/material-visibility-off.svg";
import show from "../Assets/Images/material-remove-red-eye.svg";
import illustration from "../Assets/Images/illustration.webp";

const Signup = () => {
  //Email Regex
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Password Regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //States
  const [otpScreen, setOtpScreen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nextBtnDisable, setNextBtnDisable] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  //Checkers
  const checkUsername = (name) => {
    if (name.trim() === "") {
      setUsernameError("Username cannot be empty");
    } else {
      setUsernameError("");
    }
  };

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
  const loginHandler = () => {
    navigate("/login");
  };

  const otpScreenHandler = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  const cancelSignUpHandler = () => {
    if (otpMutation.isPending) {
      return;
    }
    setUsername("");
    setEmail("");
    setPassword("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setNextBtnDisable(true);
    setOtpScreen(false);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
    checkUsername(e.target.value);
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

  const signUpVerifyHandler = (e) => {
    e.preventDefault();
    otpMutation.mutate();
  };

  // APIs
  const mutation = useMutation({
    mutationFn: () => createUser(username, email, password),
    onSuccess: (response) => {
      console.log(response);
      setOtpScreen(true);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.error || "Error. Try Again");
    },
  });

  const otpMutation = useMutation({
    mutationFn: () => verifyOTP(email, otp),
    onSuccess: (response) => {
      console.log(response);
      localStorage.setItem("jwt", response?.data?.token || "");
      dispatch(authenticationActions.updateJWT(response?.data?.token || ""));
      localStorage.setItem("username", response?.data?.username);
      localStorage.setItem("email", response?.data?.email);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.error || "Error. Try Again");
    },
  });
  //Effects
  useEffect(() => {
    if (
      !usernameError &&
      !emailError &&
      !passwordError &&
      username &&
      email &&
      password
    ) {
      setNextBtnDisable(false);
    }
  }, [usernameError, emailError, passwordError, username, email, password]);

  return (
    <div className="flex h-screen items-center justify-center">
      <img
        src={loginPageLogo}
        alt="logo"
        className="absolute left-5 top-5 h-[50px] w-auto"
      />
      <div className="flex items-center rounded-2xl shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
        <div className="animate-MorphReverse">
          <img
            className="w-[500px] rounded-bl-2xl rounded-tl-2xl"
            src={illustration}
            alt="login-background"
          />
        </div>
        <form className="animate-MorphReverse px-16 py-[21px] [&_h2]:mb-5 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#03045eff]">
          <h2 className="text-center">Sign Up</h2>
          {otpScreen ? (
            <>
              <div>
                <label htmlFor="otp" className="text-lg text-[#03045eff]">
                  Enter OTP
                </label>
                <div className="mt-2 flex w-[335px] items-center justify-between rounded-3xl border-2 border-[#03045eff]">
                  <input
                    className="ml-5 w-[calc(100%_-_75px)] border-none px-0 py-3 placeholder:text-sm placeholder:text-[#03045eff] focus-visible:outline-none"
                    type="text"
                    placeholder="OTP"
                    id="otp"
                    value={otp}
                    onChange={otpHandler}
                  />
                </div>
              </div>
              <span className="text-balance text-[#bcc1caff]">
                * OTP sent to entered email
              </span>
              <div className="mt-8 flex items-center justify-center gap-5">
                <button
                  className="h-[44px] w-[120px] cursor-pointer rounded-3xl border-none bg-[#030453ff] text-lg text-white opacity-100 hover:bg-[#0508baff] hover:active:bg-[#1519f8ff] hover:active:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={signUpVerifyHandler}
                >
                  {otpMutation.isPending ? "Verifying..." : "Verify"}
                </button>
                <button
                  className="h-[44px] w-[120px] cursor-pointer rounded-3xl border-none bg-[#030453ff] text-lg text-white opacity-100 hover:bg-[#0508baff] hover:active:bg-[#1519f8ff] hover:active:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={cancelSignUpHandler}
                  disabled={otpMutation.isPending}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="username" className="text-lg text-[#03045eff]">
                  Username
                </label>
                <div className="mt-2 flex w-[335px] items-center justify-between rounded-3xl border-2 border-[#03045eff]">
                  <input
                    className="ml-5 w-[calc(100%_-_75px)] border-none px-0 py-3 placeholder:text-sm placeholder:text-[#03045eff] focus-visible:outline-none"
                    type="text"
                    placeholder="Enter Your Username"
                    id="username"
                    required={true}
                    onChange={usernameHandler}
                    value={username}
                  />
                  <img
                    src={userIcon}
                    alt="user-icon"
                    className="mr-5 h-6 w-6"
                  />
                </div>
                {usernameError ? (
                  <span className="block w-[338px] text-sm text-[#d00000]">
                    {"* " + usernameError}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="email" className="text-lg text-[#03045eff]">
                  Email
                </label>
                <div className="mt-2 flex w-[335px] items-center justify-between rounded-3xl border-2 border-[#03045eff]">
                  <input
                    className="ml-5 w-[calc(100%_-_75px)] border-none px-0 py-3 placeholder:text-sm placeholder:text-[#03045eff] focus-visible:outline-none"
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    required={true}
                    onChange={emailHandler}
                    value={email}
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
                <label htmlFor="password" className="text-lg text-[#03045eff]">
                  Password
                </label>
                <div className="mt-2 flex w-[335px] items-center justify-between rounded-3xl border-2 border-[#03045eff]">
                  <input
                    className="ml-5 w-[calc(100%_-_75px)] border-none px-0 py-3 placeholder:text-sm placeholder:text-[#03045eff] focus-visible:outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    id="password"
                    autoComplete="true"
                    required={true}
                    onChange={passwordHandler}
                    value={password}
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
                className="my-4 w-[335px] cursor-pointer rounded-3xl border-none bg-[#03045eff] py-2 text-lg text-white transition-all duration-500 ease-in-out hover:scale-95 hover:bg-[#0508baff] hover:transition-all hover:duration-500 hover:ease-in-out hover:active:bg-[#1519f8ff] disabled:cursor-not-allowed disabled:opacity-40"
                onClick={otpScreenHandler}
                disabled={nextBtnDisable}
              >
                {mutation.isPending ? "Processing..." : "Next"}
              </button>
              <h6 className="text-center text-base text-[#bcc1caff]">
                Already have an account?{" "}
                <span
                  onClick={loginHandler}
                  className="hover:cursor-pointer hover:underline"
                >
                  Login
                </span>
              </h6>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
