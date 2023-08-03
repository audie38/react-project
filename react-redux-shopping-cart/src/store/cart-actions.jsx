import { cartActions } from "./cart";
import { notificationActions } from "./notification";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cartItem`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to Fetch Cart Data");
      }

      const data = await response.json();
      return data?.data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error",
          message: error,
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending the Data",
      })
    );

    const sendRequest = async () => {
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
    };

    try {
      await sendRequest();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Sending Data Success",
          message: "Success Sending the Data",
        })
      );
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error",
          message: error,
        })
      );
    }
  };
};
