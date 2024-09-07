import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../Redux/AuthenticationSlice";
import user from "../Assets/Images/material-account-circle.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //States
  const [username, setUsername] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  //Handlers
  const showDropdownHandler = () => {
    setShowDropdown((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("jwt");
    dispatch(authenticationActions.updateJWT(""));
    navigate("/");
  };

  //Effects
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <div className="top-0 left-0 flex items-center justify-between bg-[#1d2125] border-b border-b-[#33415c] py-[10px] px-[150px] relative">
      <h3 className="text-[#97a4b2] m-0 text-2xl">
        Welcome,{" "}
        <span className="text-white">
          {username
            ? username[0].toUpperCase() + username.slice(1).toLowerCase()
            : ""}
        </span>
      </h3>
      <div
        className="bg-[#d00000] w-[30px] h-[30px] rounded-full flex items-center hover:border-white justify-center cursor-pointer border border-transparent transition-all ease-in-out duration-200"
        onClick={showDropdownHandler}
      >
        <span className="text-white">
          {username ? username[0].toUpperCase() : ""}
        </span>
      </div>
      {showDropdown ? (
        <div className="absolute top-11 right-[82.5px] bg-[#33415c] w-[150px] rounded-md p-[5px]">
          <button
            onClick={logoutHandler}
            className="bg-transparent border-none text-white flex items-center justify-start gap-[15px] w-[140px] rounded-md p-[5px] hover:bg-[#5c677d]"
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
