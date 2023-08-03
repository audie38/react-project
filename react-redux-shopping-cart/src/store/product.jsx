import { createSlice } from "@reduxjs/toolkit";

const productInitialState = {
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    populateProduct(state, action) {
      state.product = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
