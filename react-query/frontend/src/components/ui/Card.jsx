import PropTypes from "prop-types";

export default function Card(props) {
  const classes = `card shadow-lg p-3 my-3 ${props.className}`;
  return <div className={classes}>{props.children}</div>;
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
