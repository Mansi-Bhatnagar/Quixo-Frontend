import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RootLayout from "./Screens/Root";
import Home from "./Screens/Home/Home";
import Login from "./Screens/Login/Login";
import Signup from "./Screens/Signup/Signup";
import Dashboard from "./Screens/Dashboard/Dashboard";
import AuthProtected from "./Helpers/AuthProtected/AuthProtected";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/dashboard",
        element: (
          <AuthProtected>
            <Dashboard />
          </AuthProtected>
        ),
      },
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
