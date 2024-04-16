import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Screens/Login/Login";
import RootLayout from "./Screens/Root";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [{ path: "/login", element: <Login /> }],
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
