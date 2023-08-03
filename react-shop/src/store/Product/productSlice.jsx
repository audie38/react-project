import { createSlice } from "@reduxjs/toolkit";

const productInitialState = {
  products: [],
  isFetchProductError: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    populateProduct(state, action) {
      state.products = action.payload;
    },
    setError(state, action) {
      state.isFetchProductError = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
