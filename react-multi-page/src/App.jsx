import { Outlet } from "react-router-dom";
import NavigationBar from "./components/UI/NavigationBar";
import React from "react";

export default function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="container my-5">
        <Outlet />
      </div>
    </React.Fragment>
  );
}
