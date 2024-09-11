import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate=useNavigate();

  //Effects
  useEffect(()=>{
    if(localStorage.getItem('jwt')){
      navigate("/dashboard");
    }
  },[])


  return (
    <main>
      <Outlet />
    </main>
  );
};
export default RootLayout;
