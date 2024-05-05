import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RootLayout from "./Screens/Root";
import Home from "./Screens/Home/Home";
import Login from "./Screens/Login/Login";
import Signup from "./Screens/Signup/Signup";
import Board from "./Screens/Boards/Board";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/boards", element: <Board /> },
    ],
  },
]);
function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
