import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/Images/QuixoLogo.png";
import illustration from "../Assets/Images/illustration.png";
import boardImg from "../Assets/Images/b4.png";
import cardImg from "../Assets/Images/c2.png";
import listImg from "../Assets/Images/l1.png";
import arrowUp from "../Assets/Images/material-arrow-upward.svg";
import arrowDown from "../Assets/Images/material-arrow-downward.svg";
import email from "../Assets/Images/email.svg";
import linkedin from "../Assets/Images/linkedin-in.svg";
import insta from "../Assets/Images/material-Instagram.svg";
import twitter from "../Assets/Images/material-Twitter.svg";

const Home = () => {
  const navigate = useNavigate();
  const slideContainerRef = useRef();
  const sliderHeight = window.innerWidth < 1024 ? 400 : 600;
  const components = [
    {
      heading: "Board",
      description:
        "Quixo boards orchestrate tasks seamlessly, providing a visual roadmap from inception to victory. From to-dos to triumphs, it's all in one glance!",
      image: boardImg,
    },
    {
      heading: "Lists",
      description:
        " Quixo's lists unravel tasks' journeys, whether it's the starting line or the finish. Begin with simplicity or sculpt a workflow tailored to your team. Quixo adapts flawlessly to your vision.",
      image: listImg,
    },
    {
      heading: "Cards",
      description:
        "Task-filled cards are Quixo's building blocks, packed with everything needed for success. As progress unfolds, cards migrate across lists, reflecting their evolving status.",
      image: cardImg,
    },
  ];

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
    setSlideRightStyle(-activeSlideIndex * sliderHeight);
    setSlideLeftStyle(-activeSlideIndex * sliderHeight);
  }, [activeSlideIndex]);

  return (
    <div>
      <nav className="flex items-center justify-between px-7 max-sm:px-5">
        <img
          src={logo}
          alt="logo"
          className="h-[50px] w-auto max-sm:h-[40px]"
        />
        <div className="my-[10px] flex items-center justify-center gap-2">
          <button
            className="w-[130px] rounded-3xl border-2 border-transparent bg-[#03045eff] py-1 text-base text-white transition-all duration-500 ease-in-out hover:scale-95 hover:cursor-pointer hover:border-2 hover:border-[#03045eff] hover:bg-white hover:text-[#03045eff] hover:transition-all hover:duration-500 hover:ease-in-out hover:active:bg-white disabled:cursor-not-allowed disabled:opacity-40 disabled:transition-none max-sm:w-[80px] max-sm:text-sm"
            onClick={loginHandler}
          >
            Login
          </button>
          <button
            className="w-[130px] cursor-pointer rounded-3xl border-2 border-[#03045eff] bg-white py-1 text-base font-semibold text-[#03045eff] transition-all duration-500 ease-in-out hover:scale-95 hover:bg-[#03045eff] hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out max-sm:w-[80px] max-sm:text-sm"
            onClick={signUpHandler}
          >
            Sign Up
          </button>
        </div>
      </nav>
      <div className="relative flex w-screen items-center justify-center bg-[#0353a4] bg-custom-gradient py-[125px] max-lg:pt-12">
        <div className="ml-[100px] w-[600px] text-center max-lg:ml-11 max-lg:w-full max-md:mx-5">
          <h1 className="m-0 text-5xl tracking-[1px] text-white max-lg:text-3xl">
            Quixo simplifies task management, amplifies productivity
          </h1>
          <h4 className="mt-4 text-xl tracking-[1px] text-white max-lg:text-base">
            From chaos to clarity, it keeps you on track, empowering individuals
            and teams to achieve more
          </h4>
          <button
            className="relative z-[1] mt-7 w-fit cursor-pointer rounded-3xl border-2 border-transparent bg-white px-7 py-2 text-lg font-bold text-[#03045eff] shadow-custom transition-all duration-500 ease-in-out hover:scale-95 hover:border-white hover:bg-transparent hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out max-sm:text-base"
            onClick={signUpHandler}
          >
            Sign up - it's free!
          </button>
        </div>
        <img
          src={illustration}
          alt="illustration"
          className="mr-24 w-[30vw] max-lg:mr-11 max-lg:w-[300px] max-md:hidden"
        />
        <div className="absolute bottom-[-1px] left-0 w-full rotate-180 overflow-hidden leading-[0px]">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block h-[210px] w-[calc(106%_+_1.3px)]"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>
      <div className="mb-20 mt-20 text-center max-sm:my-6">
        <h1 className="mb-4 text-5xl font-semibold tracking-[1px] text-[#001233] max-lg:text-3xl max-sm:mx-5">
          A productivity dynamo
        </h1>
        <p className="mx-auto my-0 w-[400px] text-xl tracking-[1px] max-lg:text-base max-sm:w-[calc(100vw_-_40px)]">
          Effortless organization and clarity await, with intuitive boards,
          lists, and cards guiding you through every task and team member's role
        </p>
        <div
          className="relative mx-auto my-0 mt-12 h-[600px] w-[1000px] overflow-hidden rounded-[20px] shadow-custom max-lg:h-[400px] max-lg:w-[calc(100vw_-_50px)] max-sm:hidden"
          ref={slideContainerRef}
        >
          <div
            className="absolute left-0 top-0 h-full w-[35%] bg-white transition-transform duration-500 ease-in-out max-lg:w-[50%] [&_div]:flex [&_div]:h-full [&_div]:w-full [&_div]:flex-col [&_div]:items-center [&_div]:justify-center [&_div]:text-center [&_h1]:mb-0 [&_h1]:text-[40px] [&_h1]:font-semibold [&_h1]:tracking-[1px] [&_h1]:text-[#001233] max-lg:[&_h1]:text-2xl [&_p]:mx-[54px] [&_p]:text-xl [&_p]:leading-9 [&_p]:tracking-[2px] [&_p]:text-[#5c677d] max-lg:[&_p]:text-base max-lg:[&_p]:tracking-normal"
            style={{ transform: `translateY(${slideLeftStyle}px)` }}
          >
            {components.map((item, index) => (
              <div key={index}>
                <h1>{item.heading}</h1>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div
            className="absolute right-0 top-0 h-full w-[65%] transition-transform duration-500 ease-in-out max-lg:w-[50%] [&_img]:h-full [&_img]:w-full [&_img]:object-fill"
            style={{ transform: `translateY(${slideRightStyle}px)` }}
          >
            <img src={boardImg} alt="board" />
            <img src={listImg} alt="list" />
            <img src={cardImg} alt="card" />
          </div>
          <div className="shadow-custom [&_button]:absolute [&_button]:left-[35%] [&_button]:top-1/2 [&_button]:border-none [&_button]:bg-white [&_button]:p-4 [&_button]:hover:cursor-pointer [&_button]:focus:outline-none max-lg:[&_button]:left-1/2">
            <button
              className="-translate-x-full rounded-bl-md rounded-tl-md shadow-custom"
              onClick={() => changeSlideHandler("down")}
            >
              <img src={arrowDown} alt="arrow-down" />
            </button>
            <button
              className="-translate-y-full rounded-br-md rounded-tr-md shadow-custom"
              onClick={() => changeSlideHandler("up")}
            >
              <img src={arrowUp} alt="arrow-up" />
            </button>
          </div>
        </div>
        <div className="hidden max-sm:block">
          {components.map((item, index) => {
            return (
              <div
                className="mx-auto my-12 w-[calc(100vw_-_40px)] rounded-3xl p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                key={index}
              >
                <h4 className="text-lg font-semibold text-[#001233]">
                  {item.heading}
                </h4>
                <p className="py-2 text-sm text-[#5c677d]">
                  {item.description}
                </p>

                <img
                  className="mx-auto w-[calc(100vw_-_100px)] rounded-3xl"
                  src={item.image}
                  alt={item.name}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-[#0353a4] bg-custom-gradient-180 px-5 text-center">
        <h1 className="m-0 pt-7 text-[40px] tracking-[1px] text-white max-lg:text-3xl">
          Get started with Quixo today
        </h1>
        <button
          className="relative z-[1] mt-7 w-fit cursor-pointer rounded-3xl border-2 border-transparent bg-white px-7 py-2 text-lg font-bold text-[#03045eff] shadow-custom transition-all duration-500 ease-in-out hover:scale-95 hover:border-white hover:bg-transparent hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out max-sm:text-base"
          onClick={signUpHandler}
        >
          Sign up - it's free!
        </button>
        <div className="mt-7 flex items-center justify-center pb-7 [&_a]:m-2 [&_a]:flex [&_a]:h-10 [&_a]:w-10 [&_a]:cursor-pointer [&_a]:items-center [&_a]:justify-center [&_a]:rounded-[50%] [&_a]:border-2 [&_a]:border-white max-lg:[&_a]:h-8 max-lg:[&_a]:w-8 [&_img]:w-5 [&_img]:invert-[1] max-lg:[&_img]:h-4 max-lg:[&_img]:w-4 [&_p]:mr-3 [&_p]:text-xl [&_p]:text-white max-lg:[&_p]:text-base">
          <p>Contact us at:</p>
          <a
            className="hover:scale-[1.09] hover:transition-all hover:duration-200 hover:ease-in-out"
            href="https://www.linkedin.com/in/mansi-bhatnagar-26a877225/"
          >
            <img src={linkedin} alt="linkedin" />
          </a>
          <a
            className="hover:scale-[1.09] hover:transition-all hover:duration-200 hover:ease-in-out"
            href="bhatnagarmansi.03@gmail.com"
          >
            <img src={email} alt="email" />
          </a>
          <a
            className="hover:scale-[1.09] hover:transition-all hover:duration-200 hover:ease-in-out"
            href="https://x.com/umeshku09430052?t=3ExdAq-Jnu5gal0pPxGXBQ&s=09"
          >
            <img src={twitter} alt="twitter" />
          </a>
          <a
            className="hover:scale-[1.09] hover:transition-all hover:duration-200 hover:ease-in-out"
            href="https://www.instagram.com/umesh_089/"
          >
            <img src={insta} alt="insta" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
