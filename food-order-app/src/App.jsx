import NavigationBar from "./components/UI/NavigationBar";
import Card from "./components/UI/Card";
import Home from "./components/Home";
import AuthForm from "./components/Auth/AuthForm";
import React, { useContext } from "react";
import AuthContext from "./store/auth-context";

export default function App() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="container d-flex justify-content-center my-5">
        <Card className="w-75">{ctx.isLoggedIn ? <Home /> : <AuthForm />}</Card>
      </div>
    </React.Fragment>
  );
}
