import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = (props) => {
  const loggedInUser = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = !isNaN(loggedInUser?.userId);
  return isLoggedIn ? <>{props.children}</> : <Navigate to="/login" replace />;
};

Private.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Private;
