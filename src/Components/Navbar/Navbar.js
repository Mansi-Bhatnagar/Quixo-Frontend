import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../../Redux/AuthenticationSlice";
import user from "../../Assets/Images/material-account-circle.svg";
import classes from "./Navbar.module.css";
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
    navigate("/login");
  };

  //Effects
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <div className={classes.container}>
      <h3>
        Welcome,{" "}
        <span>
          {username
            ? username[0].toUpperCase() + username.slice(1).toLowerCase()
            : ""}
        </span>
      </h3>
      <div className={classes.dropdown} onClick={showDropdownHandler}>
        <span>{username ? username[0].toUpperCase() : ""}</span>
      </div>
      {showDropdown ? (
        <div className={classes.dropdownItemContainer}>
          <button onClick={logoutHandler}>
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
