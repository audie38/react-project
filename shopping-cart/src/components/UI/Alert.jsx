import PropTypes from "prop-types";

const Alert = (props) => {
  const alertClasses = `alert alert-${props.type}`;
  return (
    <div className={alertClasses} role="alert">
      {props.message}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
};

Alert.defaultProps = {
  type: "danger",
};

export default Alert;
