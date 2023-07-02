import { useState, useEffect } from "react";
import AuthContext from "./store/auth-context";

import NavigationBar from "./components/UI/NavigationBar";
import Card from "./components/UI/Card";
import Home from "./components/Home";
import AuthForm from "./components/Auth/AuthForm";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("credential"));
    if (storedData && storedData?.isLoggedIn) {
      setIsAuth(true);
    }
  }, []);

  const loginHandler = (credential) => {
    const data = { ...credential, isLoggedIn: true };
    localStorage.setItem("credential", JSON.stringify(data));
    setIsAuth(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("credential");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuth,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      <NavigationBar />
      <div className="container d-flex justify-content-center my-5">
        <Card className="w-75">{isAuth ? <Home /> : <AuthForm />}</Card>
      </div>
    </AuthContext.Provider>
  );
}
