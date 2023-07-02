import PropTypes from "prop-types";

export default function Alert({ msg, type }) {
  return (
    <div className={`alert alert-${type} mx-2`} role="alert">
      <span className="fw-bold fs-5">{msg}</span>
    </div>
  );
}

Alert.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  type: "danger",
  msg: "",
};
