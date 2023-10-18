import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const Public = (props) => {
  console.log("Props", props.userData);
  return props.userData ? <Navigate to="/" /> : <>{props.children}</>;
};

Public.propTypes = {
  userData: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Public;
