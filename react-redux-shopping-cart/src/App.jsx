import { Fragment } from "react";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";

export default function App() {
  return (
    <Fragment>
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </Fragment>
  );
}
