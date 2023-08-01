import { Fragment, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useSelector, useDispatch } from "react-redux";
import { productActions } from "./store/product";

let initialState = true;

export default function App() {
  const showCart = useSelector((state) => state.product.showCart);
  const notification = useSelector((state) => state.product.notification);
  const cart = useSelector((state) => state.product.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    const sendRequest = async () => {
      dispatch(
        productActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending the Data",
        })
      );
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cartItem`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error("Failed to Send data");
      }
      dispatch(
        productActions.showNotification({
          status: "success",
          title: "Sending Data Success",
          message: "Success Sending the Data",
        })
      );
    };
    if (initialState) {
      initialState = false;
      return;
    }
    sendRequest().catch((err) => {
      dispatch(
        productActions.showNotification({
          status: "error",
          title: "Error",
          message: err,
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>{showCart ? <Cart /> : <Products />}</Layout>
    </Fragment>
  );
}
