import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./components/layout/Root";
import Error from "./pages/Error";

import Public from "./components/layout/Public";
import Private from "./components/layout/Private";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
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

  return <RouterProvider router={router} />;
}
