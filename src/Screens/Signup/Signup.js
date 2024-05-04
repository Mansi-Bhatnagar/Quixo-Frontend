import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginBackground from "../../Assets/Images/loginBackground.jpg";
import userIcon from "../../Assets/Images/material-perm-identity.svg";
import loginPageLogo from "../../Assets/Images/loginPageLogo.png";
import emailIcon from "../../Assets/Images/material-email.svg";
import hide from "../../Assets/Images/material-visibility-off.svg";
import show from "../../Assets/Images/material-remove-red-eye.svg";
import classes from "./Signup.module.css";

const Signup = () => {
  //Email Regex
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Password Regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const navigate = useNavigate();

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

  const otpScreenHandler = () => {
    setOtpScreen(true);
    axios
      .post(
        "http://localhost:5000/signup",
        {
          username: username,
          email: email,
          password: password,
        },
        { headers: { "X-Requested-With": "XMLHttpRequest" } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUpScreenHandler = () => {
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
    axios
      .post(
        "http://localhost:5000/signup_verification",
        {
          email: email,
          otp: otp,
        },
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            withCredentials: true,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    <div className={classes.container}>
      <div className={classes.section1}>
        <img src={loginBackground} alt="login-background" />
        <div className={classes.overlay}>
          <h1>We haven't met before, right?</h1>
          <h2>Organize your tasks and improve yourself with the quixo app</h2>
        </div>
      </div>
      <div className={classes.section2}>
        <img src={loginPageLogo} alt="logo" className={classes.logo} />
        <form className={classes.signupForm}>
          <h2>Sign Up</h2>
          {otpScreen ? (
            <>
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
              <div className={classes.btnContainer}>
                <button className={classes.btn} onClick={signUpVerifyHandler}>
                  Verify
                </button>
                <button className={classes.btn} onClick={signUpScreenHandler}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="username" className={classes.label}>
                  Username
                </label>
                <div className={classes.inputContainer}>
                  <input
                    type="text"
                    placeholder="Enter Your Username"
                    id="username"
                    required={true}
                    onChange={usernameHandler}
                    value={username}
                  />
                  <img src={userIcon} alt="user-icon" />
                </div>
                {usernameError ? (
                  <span className={classes.error}>{"* " + usernameError}</span>
                ) : (
                  ""
                )}
              </div>
              <div className={classes.field}>
                <label htmlFor="email" className={classes.label}>
                  Email
                </label>
                <div className={classes.inputContainer}>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    required={true}
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
                    required={true}
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
                className={classes.nextBtn}
                onClick={otpScreenHandler}
                disabled={nextBtnDisable}
              >
                Next
              </button>
              <span className={classes.login}>
                Already have an account?{" "}
                <span onClick={loginHandler}>Login</span>
              </span>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
