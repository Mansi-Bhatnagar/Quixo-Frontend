import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Screens/Root";
import Login from "./Screens/Login/Login";
import Signup from "./Screens/Signup/Signup";
import Board from "./Screens/Boards/Board";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/boards", element: <Board /> },
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
