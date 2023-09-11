import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product/productSlice";

const store = configureStore({
  reducer: { prod: productReducer },
});

export default store;
