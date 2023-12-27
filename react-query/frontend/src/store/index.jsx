import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import notifReducer from "./notification/notificationSlice";

const store = configureStore({
  reducer: { notif: notifReducer, auth: authReducer },
});

export default store;
