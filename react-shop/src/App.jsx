import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./components/Layout/Root";
import Product from "./pages/Product/Product";
import ProductAddEdit from "./pages/Product/ProductAddEdit";
import Cart from "./pages/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        element: <Product />,
      },
      {
        path: "/product",
        element: <ProductAddEdit />,
      },
      {
        path: "/product/:id",
        element: <ProductAddEdit />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
