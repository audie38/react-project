import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const Private = (props) => {
  return props.userData ? <>{props.children}</> : <Navigate to="/login" replace />;
};

Private.propTypes = {
  userData: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Private;
