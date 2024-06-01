import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthProtected = ({ children }) => {
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.authentication.jwt);
  useEffect(() => {
    if (!jwt) {
      navigate("/login");
      return;
    }
  }, []);
  return children;
};

export default AuthProtected;
