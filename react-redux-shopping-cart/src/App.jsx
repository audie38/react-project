import { Fragment } from "react";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useSelector } from "react-redux";

export default function App() {
  const showCart = useSelector((state) => state.product.showCart);
  const notification = useSelector((state) => state.product.notification);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>{showCart ? <Cart /> : <Products />}</Layout>
    </Fragment>
  );
}
