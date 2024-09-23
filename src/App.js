import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import RootLayout from "./Screens/Root";
import Home from "./Screens/Home/Home";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Dashboard from "./Screens/Dashboard";
import AuthProtected from "./Helpers/AuthProtected/AuthProtected";
import Members from "./Screens/Members";
import "react-toastify/dist/ReactToastify.css";
import Boards from "./Screens/Boards";
import BoardDetail from "./Screens/BoardDetail";

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
        children: [
          {
            path: "/dashboard/:id/:workspaceName/members",
            element: <Members />,
          },
          { path: "/dashboard/:id/:workspaceName/boards", element: <Boards /> },
        ],
      },
      {
        path: "/board/:boardsId",
        element: (
          <AuthProtected>
            <BoardDetail />
          </AuthProtected>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </QueryClientProvider>
  );
}

export default App;
