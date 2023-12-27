import { authActions } from "./authSlice";
import { notificationActions } from "../notification/notificationSlice";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL || "";
const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL || "";

const sendRequest = async (url, config, dispatch) => {
  const response = await fetch(url, config);
  const responseData = await response.json();
  if (!response.ok) {
    const message = responseData?.message || "500 Internal Server Error";
    dispatch(notificationActions.setErrorNotif(message));
  }
  return responseData?.data;
};

export const registerNewUser = (newUserObj) => {
  return async (dispatch) => {
    try {
      const url = `${API_BASE_URL}/user`;
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newUserObj),
      };

      dispatch(notificationActions.setStartLoading());
      const newUserData = await sendRequest(url, config, dispatch);
      dispatch(authActions.setUserInfo(newUserData));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const loginUser = (userObj) => {
  return async (dispatch) => {
    try {
      dispatch(notificationActions.clearErrorNotif());
      const url = `${API_BASE_URL}/user/login`;
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userObj),
      };

      dispatch(notificationActions.setStartLoading());
      const userData = await sendRequest(url, config, dispatch);
      dispatch(authActions.setUserInfo(userData));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const oauthUserLogin = () => {
  return async (dispatch) => {
    try {
      const url = `${BACKEND_URL}/auth/login/success`;
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
      };

      const userData = await sendRequest(url, config, dispatch);
      dispatch(authActions.setUserInfo(userData));
    } catch (error) {
      dispatch(notificationActions.setErrorNotif(error));
    }
  };
};

export const getLoggedInUserData = () => {
  return async (dispatch) => {
    try {
      const url = `${API_BASE_URL}/user`;
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
      };

      dispatch(notificationActions.setStartLoading());
      const userData = await sendRequest(url, config, dispatch);
      dispatch(authActions.setUserInfo(userData));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(notificationActions.clearErrorNotif());
      const url = `${API_BASE_URL}/user/logout`;
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
      };
      dispatch(notificationActions.setStartLoading());
      await sendRequest(url, config, dispatch);
      dispatch(authActions.logoutUser());
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const oauthUserLogout = () => {
  return async (dispatch) => {
    try {
      dispatch(notificationActions.clearErrorNotif());
      const url = `${BACKEND_URL}/auth/logout`;
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
      };
      dispatch(notificationActions.setStartLoading());
      await sendRequest(url, config, dispatch);
      dispatch(authActions.logoutUser());
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};
