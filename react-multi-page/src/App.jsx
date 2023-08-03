import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./components/Layout/Root";
import Home from "./pages/Home";
import Product from "./pages/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
