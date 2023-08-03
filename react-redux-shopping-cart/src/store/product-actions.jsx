import { productActions } from "./product";
import { notificationActions } from "./notification";

export const fetchProductData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/product`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to Fetch Product Data");
      }
      const data = await response.json();
      return data?.data;
    };

    try {
      const productData = await fetchData();
      dispatch(productActions.populateProduct(productData));
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
