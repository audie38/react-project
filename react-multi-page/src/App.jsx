import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./components/Layout/Root";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./components/Product/ProductDetail";
import Error from "./pages/Error";

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
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
