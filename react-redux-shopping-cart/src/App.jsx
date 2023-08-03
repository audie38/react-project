import { Fragment, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import { fetchProductData } from "./store/product-actions";

let initialState = true;

export default function App() {
  const showCart = useSelector((state) => state.cart.showCart);
  const notification = useSelector((state) => state.cart.notification);
  const cart = useSelector((state) => state.cart.cart);
  const cartUpdated = useSelector((state) => state.cart.itemsUpdated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (initialState) {
      initialState = false;
      return;
    }
    if (cartUpdated) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch, cartUpdated]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>{showCart ? <Cart /> : <Products />}</Layout>
    </Fragment>
  );
}
