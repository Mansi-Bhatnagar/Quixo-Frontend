import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Screens/Root";
import Login from "./Screens/Login/Login";
import Signup from "./Screens/Signup/Signup";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
