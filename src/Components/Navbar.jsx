import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../Redux/AuthenticationSlice";
import user from "../Assets/Images/material-account-circle.svg";
import { logout } from "../Services/Auth";
import { useMutation } from "@tanstack/react-query";
import { Bars4Icon } from "@heroicons/react/20/solid";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //States
  const [username, setUsername] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userColor, setUserColor] = useState("");

  //APIs
  const logoutMutation = useMutation({
    mutationFn: () => logout(localStorage.getItem("email")),
    onSuccess: (response) => {
      console.log(response);
      localStorage.removeItem("jwt");
      dispatch(authenticationActions.updateJWT(""));
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //Handlers
  const showDropdownHandler = () => {
    setShowDropdown((prev) => !prev);
  };

  const logoutHandler = () => {
    logoutMutation.mutate();
  };

  const sidebarVisibleHandler = () => {
    props.isSidebarVisible(!props.sidebarVisible);
  };

  //Effects
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setUserColor(localStorage.getItem("userColor"));
    console.log(typeof localStorage.getItem("userColor"));
  }, []);

  return (
    <div className="relative left-0 top-0 flex items-center justify-between border-b border-b-[#33415c] bg-[#1d2125] px-[150px] py-[10px] max-xl:px-[3%] max-sm:px-[5%]">
      <div className="flex w-full items-center justify-start gap-2">
        <div className="hidden h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-[#5c677d] max-md:flex max-sm:h-6 max-sm:w-6">
          <Bars4Icon
            className="hidden h-5 w-5 text-white max-md:block"
            onClick={sidebarVisibleHandler}
          />
        </div>

        <h3 className="m-0 text-2xl text-[#97a4b2]">
          Welcome,{" "}
          <span className="text-white">
            {username
              ? username[0].toUpperCase() + username.slice(1).toLowerCase()
              : ""}
          </span>
        </h3>
      </div>
      <div
        className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border border-transparent ${userColor} transition-all duration-200 ease-in-out hover:border-white`}
        onClick={showDropdownHandler}
      >
        <span className="text-white">
          {username ? username[0].toUpperCase() : ""}
        </span>
      </div>
      {showDropdown ? (
        <div className="absolute right-[82.5px] top-11 w-[150px] rounded-md bg-[#33415c] p-[5px] max-xl:right-[3%]">
          <button
            onClick={logoutHandler}
            className="flex w-[140px] items-center justify-start gap-[15px] rounded-md border-none bg-transparent p-[5px] text-white hover:bg-[#5c677d]"
          >
            <img src={user} alt="user-icon" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
