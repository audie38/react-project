import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import productReducer from "./product";
import notificationReducer from "./notification";

const store = configureStore({
  reducer: { cart: cartReducer, notif: notificationReducer, product: productReducer },
});

export default store;
