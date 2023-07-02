import { useState, useEffect } from "react";
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
    <div>
      <NavigationBar isAuth={isAuth} onLogout={logoutHandler} />
      <div className="container d-flex justify-content-center my-5">
        <Card className="w-75">{isAuth ? <Home /> : <AuthForm onLogin={loginHandler} />}</Card>
      </div>
    </div>
  );
}
