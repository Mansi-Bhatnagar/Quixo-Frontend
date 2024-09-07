import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/QuixoLogo.png";
import illustration from "../../Assets/Images/illustration.png";
import boardImg from "../../Assets/Images/Board.webp";
import cardImg from "../../Assets/Images/Card.webp";
import listImg from "../../Assets/Images/List.webp";
import arrowUp from "../../Assets/Images/material-arrow-upward.svg";
import arrowDown from "../../Assets/Images/material-arrow-downward.svg";
import email from "../../Assets/Images/email.svg";
import linkedin from "../../Assets/Images/linkedin-in.svg";
import insta from "../../Assets/Images/material-Instagram.svg";
import twitter from "../../Assets/Images/material-Twitter.svg";
import classes from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const slideContainerRef = useRef();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slideLeftStyle, setSlideLeftStyle] = useState(0);
  const [slideRightStyle, setSlideRightStyle] = useState(0);

  //Handlers
  const signUpHandler = () => {
    navigate("/signup");
  };
  const loginHandler = () => {
    navigate("/login");
  };

  const changeSlideHandler = (direction) => {
    const slidesLength = 3;
    console.log(slideContainerRef);
    let temp = activeSlideIndex;
    if (direction === "up") {
      setActiveSlideIndex((prev) => {
        temp = prev + 1;
        if (temp > slidesLength - 1) return 0;
        return temp;
      });
    } else if (direction === "down") {
      setActiveSlideIndex((prev) => {
        temp = prev - 1;
        if (temp < 0) return slidesLength - 1;
        return temp;
      });
    }
  };
  useEffect(() => {
    const sliderHeight = 600;
    setSlideRightStyle(-activeSlideIndex * sliderHeight);
    setSlideLeftStyle(-activeSlideIndex * sliderHeight);
  }, [activeSlideIndex]);

  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <img src={logo} alt="logo" />
        <div>
          <button className={classes.loginBtn} onClick={loginHandler}>
            Login
          </button>
          <button className={classes.signUpBtn} onClick={signUpHandler}>
            Sign Up
          </button>
        </div>
      </nav>
      <div className={classes.heroSection}>
        <div className={classes.info}>
          <h1>Quixo simplifies task management, amplifies productivity</h1>
          <h4>
            From chaos to clarity, it keeps you on track, empowering individuals
            and teams to achieve more
          </h4>
          <button className={classes.quickSignUpBtn} onClick={signUpHandler}>
            Sign up - it's free!
          </button>
        </div>
        <img
          src={illustration}
          alt="illustration"
          className={classes.illustration}
        />
        <div className={classes.shapeDivider}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className={classes.shapeFill}
            ></path>
          </svg>
        </div>
      </div>
      <div className={classes.features}>
        <h1 className={classes.featureHeading}>A productivity dynamo</h1>
        <p className={classes.featurePara}>
          Effortless organization and clarity await, with intuitive boards,
          lists, and cards guiding you through every task and team member's role
        </p>
        <div className={classes.sliderContainer} ref={slideContainerRef}>
          <div
            className={classes.leftSlide}
            style={{ transform: `translateY(${slideLeftStyle}px)` }}
          >
            <div>
              <h1>Board</h1>
              <p>
                Quixo boards orchestrate tasks seamlessly, providing a visual
                roadmap from inception to victory. From to-dos to triumphs, it's
                all in one glance!
              </p>
            </div>
            <div>
              <h1>Lists</h1>
              <p>
                Quixo's lists unravel tasks' journeys, whether it's the starting
                line or the finish. Begin with simplicity or sculpt a workflow
                tailored to your team. Quixo adapts flawlessly to your vision.
              </p>
            </div>
            <div>
              <h1>Cards</h1>
              <p>
                Task-filled cards are Quixo's building blocks, packed with
                everything needed for success. As progress unfolds, cards
                migrate across lists, reflecting their evolving status.
              </p>
            </div>
          </div>
          <div
            className={classes.rightSlide}
            style={{ transform: `translateY(${slideRightStyle}px)` }}
          >
            <img src={boardImg} alt="board" />
            <img src={listImg} alt="list" />
            <img src={cardImg} alt="card" />
          </div>
          <div className={classes.actionButtons}>
            <button
              className={classes.downButton}
              onClick={() => changeSlideHandler("down")}
            >
              <img src={arrowDown} alt="arrow-down" />
            </button>
            <button
              className={classes.upButton}
              onClick={() => changeSlideHandler("up")}
            >
              <img src={arrowUp} alt="arrow-up" />
            </button>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <h1>Get started with Quixo today</h1>
        <button className={classes.quickSignUpBtn} onClick={signUpHandler}>
          Sign up - it's free!
        </button>
        <div className={classes.imageContainer}>
          <p>Contact us at:</p>
          <a href="https://www.linkedin.com/in/mansi-bhatnagar-26a877225/">
            <img src={linkedin} alt="linkedin" />
          </a>
          <a href="bhatnagarmansi.03@gmail.com">
            <img src={email} alt="email" />
          </a>
          <a href="https://x.com/umeshku09430052?t=3ExdAq-Jnu5gal0pPxGXBQ&s=09">
            <img src={twitter} alt="twitter" />
          </a>
          <a href="https://www.instagram.com/umesh_089/">
            <img src={insta} alt="insta" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
