import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./components/layout/Root";
import Error from "./components/page/Error";

import Event from "./components/page/event/Event";
import EventAddEdit from "./components/page/event/EventAddEdit";
import EventDetail from "./components/page/event/EventDetail";

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
          element: <Event />,
        },
        {
          path: "/event",
          element: <EventAddEdit />,
        },
        {
          path: "/event/:id",
          element: <EventDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
