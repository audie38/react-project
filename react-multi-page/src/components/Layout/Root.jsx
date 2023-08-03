import { Fragment } from "react";
import NavigationBar from "../UI/NavigationBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <Fragment>
      <NavigationBar />
      <div className="container my-5">
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Root;
