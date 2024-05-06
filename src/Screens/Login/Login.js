import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginPageLogo from "../../Assets/Images/loginPageLogo.png";
import emailIcon from "../../Assets/Images/material-email.svg";
import hide from "../../Assets/Images/material-visibility-off.svg";
import show from "../../Assets/Images/material-remove-red-eye.svg";
import check from "../../Assets/Images/material-check.svg";
import loginBackground from "../../Assets/Images/loginBackground.jpg";

import classes from "./Login.module.css";
import axios from "axios";
import { NotificationManager } from "../../Components/NotificationManager/NotificationManager";

const Login = () => {
  //Email Regex
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Password Regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const navigate = useNavigate();

  //States
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem("Quixo"))?.checked ? true : false
  );
  const [email, setEmail] = useState("");
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
    axios
      .post(
        "http://localhost:5000/login",
        {
          email: email,
          password: password,
        },
        { headers: { "X-Requested-With": "XMLHttpRequest" } }
      )
      .then((response) => {
        if (checked) {
          localStorage.setItem(
            "Quixo",
            JSON.stringify({ email: email, password: password, checked: true })
          );
        }
        navigate("/boards");
      })
      .catch((error) => {
        NotificationManager(
          error?.response?.data?.error || "Error, Try again",
          "top-left"
        );
      });
  };

  const forgetPasswordHandler = () => {
    axios
      .post(
        "http://localhost:5000/pw_forget",
        { email: email },
        { headers: { "X-Requested-With": "XMLHttpRequest" } }
      )
      .then((response) => {
        setForgetPwdScreen(true);
      })
      .catch((error) => {
        NotificationManager(
          error?.response?.data?.error || "Error, Try again",
          "top-left"
        );
      });
  };
  const createNewPasswordHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/pw_reset", {
        email: email,
        new_password: password,
        otp: Number(otp),
      })
      .then((response) => setForgetPwdScreen(false))
      .catch((error) => {
        NotificationManager(
          error?.response?.data?.error || "Error, Try again",
          "top-left"
        );
      });
  };

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
    if (checked) {
      setEmail(JSON.parse(localStorage.getItem("Quixo")).email);
      setPassword(JSON.parse(localStorage.getItem("Quixo")).password);
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.section1}>
        <img src={loginPageLogo} alt="logo" className={classes.logo} />
        <form className={classes.loginForm}>
          <h2>Login</h2>
          {forgetPwdScreen ? (
            <>
              <div className={classes.field}>
                <div>
                  <label htmlFor="otp" className={classes.label}>
                    Enter OTP
                  </label>
                  <div className={classes.inputContainer}>
                    <input
                      type="text"
                      placeholder="OTP"
                      id="otp"
                      value={otp}
                      onChange={otpHandler}
                    />
                  </div>
                </div>
                <span className={classes.otpInfo}>
                  * OTP sent to entered email
                </span>
              </div>
              <div className={classes.field}>
                <label htmlFor="new-password" className={classes.label}>
                  New Password
                </label>
                <div className={classes.inputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter New Password"
                    id="new-password"
                    autoComplete="true"
                    onChange={passwordHandler}
                    value={password}
                  />
                  <img
                    src={showPassword ? show : hide}
                    alt="visibility-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                {passwordError ? (
                  <span className={classes.error}>{"* " + passwordError}</span>
                ) : (
                  ""
                )}
              </div>
              <button
                className={classes.loginBtn}
                disabled={newPasswordBtnDisable}
                onClick={createNewPasswordHandler}
              >
                Create
              </button>
            </>
          ) : (
            <>
              <h4>Welcome Back</h4>
              <div className={classes.field}>
                <label htmlFor="email" className={classes.label}>
                  Email
                </label>
                <div className={classes.inputContainer}>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    onChange={emailHandler}
                    value={email}
                  />
                  <img src={emailIcon} alt="email-icon" />
                </div>
                {emailError ? (
                  <span className={classes.error}>{"* " + emailError}</span>
                ) : (
                  ""
                )}
              </div>
              <div className={classes.field}>
                <label htmlFor="password" className={classes.label}>
                  Password
                </label>
                <div className={classes.inputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    id="password"
                    autoComplete="true"
                    onChange={passwordHandler}
                    value={password}
                  />
                  <img
                    src={showPassword ? show : hide}
                    alt="visibility-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                {passwordError ? (
                  <span className={classes.error}>{"* " + passwordError}</span>
                ) : (
                  ""
                )}
              </div>
              <div className={classes.options}>
                <div className={classes.remember}>
                  <div
                    className={classes.checkbox}
                    onClick={rememberPasswordHandler}
                  >
                    {checked ? <img src={check} alt="check" /> : ""}
                  </div>
                  <span onClick={rememberPasswordHandler}>Remember Me</span>
                </div>
                <span onClick={forgetPasswordHandler}>Forget Password?</span>
              </div>
              <button
                className={classes.loginBtn}
                disabled={loginBtnDisable}
                onClick={loginHandler}
              >
                Login
              </button>
              <span className={classes.signUp}>
                Don't have an account?{" "}
                <span onClick={signUpHandler}>Sign up</span>
              </span>
            </>
          )}
        </form>
      </div>
      <div className={classes.section2}>
        <img src={loginBackground} alt="login-background" />
        <div className={classes.overlay}>
          <h1>We haven't met before, right?</h1>
          <h2>Organize your tasks and improve yourself with the quixo app</h2>
          <button className={classes.signUpBtn} onClick={signUpHandler}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
