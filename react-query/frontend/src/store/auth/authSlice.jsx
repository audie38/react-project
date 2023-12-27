import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setUserInfo(state, action) {
      const userData = {
        userId: parseInt(action?.payload?.userId),
        displayName: action?.payload?.name,
        email: action?.payload?.email,
        username: action?.payload?.username,
        photo: action?.payload?.photo,
      };
      state.userInfo = userData;
      if (!isNaN(userData?.userId)) {
        localStorage.setItem("userInfo", JSON.stringify(userData));
      }
    },
    logoutUser(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
