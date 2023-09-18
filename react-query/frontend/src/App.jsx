import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./components/layout/Root";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [],
    },
  ]);

  return <RouterProvider router={router} />;
}
