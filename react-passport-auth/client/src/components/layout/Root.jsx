import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

import NavigationBar from "./NavigationBar";

const Root = ({ userData }) => {
  return (
    <Fragment>
      <NavigationBar userData={userData} />
      <div>
        <Outlet />
      </div>
    </Fragment>
  );
};

Root.propTypes = {
  userData: PropTypes.object,
};

export default Root;
