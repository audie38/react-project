import { createSlice } from "@reduxjs/toolkit";

const notificationInitialState = {
  notification: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    showNotification(state, action) {
      state.notification = { status: action.payload.status, title: action.payload.title, message: action.payload.message };
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
