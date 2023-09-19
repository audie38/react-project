import PropTypes from "prop-types";

export default function Alert({ type, message }) {
  const classes = `alert alert-${type}`;
  return (
    <div className={classes} role="alert">
      {message}
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
};

Alert.defaultProps = {
  type: "danger",
};
