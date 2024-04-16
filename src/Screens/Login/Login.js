import loginPageLogo from "../../Assets/Images/loginPageLogo.png";
import emailIcon from "../../Assets/Images/material-email.svg";
import eyeIcon from "../../Assets/Images/material-visibility-off.svg";
import loginBackground from "../../Assets/Images/loginBackground.jpg";

import classes from "./Login.module.css";

const Login = () => {
  return (
    <div className={classes.container}>
      <div className={classes.section1}>
        <img src={loginPageLogo} alt="logo" />
        <form className={classes.loginForm}>
          <h2>Login</h2>
          <h4>Welcome Back</h4>
          <label htmlFor="email" className={classes.label}>
            Email
          </label>
          <div className={classes.inputContainer}>
            <input type="email" placeholder="Enter Your Email" id="email" />
            <img src={emailIcon} alt="email-icon" />
          </div>
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
        </form>
      </div>
      <div className={classes.section2}>
        <img src={loginBackground} alt="login-background" />
      </div>
    </div>
  );
};

export default Login;
