import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginPageLogo from "../../Assets/Images/loginPageLogo.png";
import emailIcon from "../../Assets/Images/material-email.svg";
import eyeIcon from "../../Assets/Images/material-visibility-off.svg";
import check from "../../Assets/Images/material-check.svg";
import loginBackground from "../../Assets/Images/loginBackground.jpg";

import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  const rememberPasswordHandler = () => {
    setChecked((prev) => !prev);
  };

  const signUpHandler = () => {
    navigate("/signup");
  };

  return (
    <div className={classes.container}>
      <div className={classes.section1}>
        <img src={loginPageLogo} alt="logo" className={classes.logo} />
        <form className={classes.loginForm}>
          <h2>Login</h2>
          <h4>Welcome Back</h4>
          <div>
            <label htmlFor="email" className={classes.label}>
              Email
            </label>
            <div className={classes.inputContainer}>
              <input type="email" placeholder="Enter Your Email" id="email" />
              <img src={emailIcon} alt="email-icon" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className={classes.label}>
              Password
            </label>
            <div className={classes.inputContainer}>
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                autoComplete="true"
              />
              <img src={eyeIcon} alt="visibility-icon" />
            </div>
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
            <span>Forget Password?</span>
          </div>
          <button className={classes.loginBtn}>Login</button>
          <span className={classes.signUp}>
            Don't have an account? <span onClick={signUpHandler}>Sign up</span>
          </span>
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
