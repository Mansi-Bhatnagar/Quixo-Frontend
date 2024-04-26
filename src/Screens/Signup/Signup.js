import { useNavigate } from "react-router-dom";
import loginBackground from "../../Assets/Images/loginBackground.jpg";
import userIcon from "../../Assets/Images/material-perm-identity.svg";
import loginPageLogo from "../../Assets/Images/loginPageLogo.png";
import emailIcon from "../../Assets/Images/material-email.svg";
import eyeIcon from "../../Assets/Images/material-visibility-off.svg";
import classes from "./Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/login");
  };

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
          <div>
            <label htmlFor="username" className={classes.label}>
              Username
            </label>
            <div className={classes.inputContainer}>
              <input
                type="text"
                placeholder="Enter Your Username"
                id="username"
              />
              <img src={userIcon} alt="user-icon" />
            </div>
          </div>
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
          <button className={classes.nextBtn}>Next</button>
          <span className={classes.login}>
            Already have an account? <span onClick={loginHandler}>Login</span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
