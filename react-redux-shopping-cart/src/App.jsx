import { Fragment, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useSelector, useDispatch } from "react-redux";
import { sendCartData } from "./store/product";

let initialState = true;

export default function App() {
  const showCart = useSelector((state) => state.product.showCart);
  const notification = useSelector((state) => state.product.notification);
  const cart = useSelector((state) => state.product.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (initialState) {
      initialState = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>{showCart ? <Cart /> : <Products />}</Layout>
    </Fragment>
  );
}
