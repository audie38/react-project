/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (credential) => {},
});

export const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);

  const loginHandler = (credential) => {
    const data = { ...credential, isLoggedIn: true };
    localStorage.setItem("credential", JSON.stringify(data));
    setIsAuth(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("credential");
    setIsAuth(false);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("credential"));
    if (storedData && storedData?.isLoggedIn) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuth,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AuthContext;
