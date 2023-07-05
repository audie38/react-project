import PropTypes from "prop-types";

export default function Badge({ type, displayText, className }) {
  const classes = `badge rounded-pill text-bg-${type} ${className}`;
  return <span className={classes}>{displayText}</span>;
}

Badge.propTypes = {
  type: PropTypes.string.isRequired,
  displayText: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Badge.defaultProps = {
  type: "danger",
  displayText: 0,
};
