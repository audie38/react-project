import { useState } from "react";
import NavigationBar from "./components/UI/NavigationBar";
import Card from "./components/UI/Card";
import Home from "./components/Home";
import AuthForm from "./components/Auth/AuthForm";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const isAuthHandler = () => {
    setIsAuth(!isAuth);
  };

  return (
    <div>
      <NavigationBar isAuth={isAuth} onLogout={isAuthHandler} />
      <div className="container d-flex justify-content-center my-5">
        <Card className="w-75">{isAuth ? <Home /> : <AuthForm onLogin={isAuthHandler} />}</Card>
      </div>
    </div>
  );
}
