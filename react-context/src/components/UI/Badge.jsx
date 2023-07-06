import PropTypes from "prop-types";

const Badge = (props) => {
  const classes = `badge rounded-pill text-bg-${props.type} ${props.className}`;
  return <span className={classes}>{props.text}</span>;
};

Badge.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Badge.defaultProps = {
  type: "danger",
  text: 0,
};

export default Badge;
