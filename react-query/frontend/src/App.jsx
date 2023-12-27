import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { oauthUserLogin } from "./store/auth/authActions";

import Root from "./components/layout/Root";
import Error from "./pages/Error";

import Public from "./components/layout/Public";
import Private from "./components/layout/Private";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          index: true,
          element: (
            <Public>
              <h1>Event</h1>
            </Public>
          ),
        },
        {
          path: "/event",
          element: (
            <Private>
              <h1>Create Event</h1>
            </Private>
          ),
        },
        {
          path: "/event/:id",
          element: (
            <Private>
              <h1>Edit Event</h1>
            </Private>
          ),
        },
        {
          path: "/login",
          element: (
            <Public>
              <Login />
            </Public>
          ),
        },
        {
          path: "/register",
          element: (
            <Public>
              <Register />
            </Public>
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
    dispatch(oauthUserLogin());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
