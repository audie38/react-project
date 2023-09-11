import { productActions } from "./productSlice";

export const fetchData = () => {
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
      const productData = await response.json();
      return productData.data;
    };

    try {
      const data = await fetchData();
      dispatch(productActions.populateProduct(data));
    } catch (error) {
      dispatch(
        productActions.setError({
          message: error.message,
        })
      );
    }
  };
};
