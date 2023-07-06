import PropTypes from "prop-types";

export default function Card(props) {
  const classes = `card shadow-lg p-5 my-5 rounded-4 ${props.className}`;
  return <div className={classes}>{props.children}</div>;
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
