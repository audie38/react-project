import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

export default function Root() {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
}
