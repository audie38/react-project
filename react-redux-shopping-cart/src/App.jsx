import { Fragment } from "react";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";

import { useSelector } from "react-redux";

export default function App() {
  const showCart = useSelector((state) => state.product.showCart);
  return (
    <Fragment>
      <Layout>{showCart ? <Cart /> : <Products />}</Layout>
    </Fragment>
  );
}
