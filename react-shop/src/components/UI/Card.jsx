import PropTypes from "prop-types";

const Card = (props) => {
  const classes = `card shadow-lg p-5 rounded-5 ${props.className}`;
  return <div className={classes}>{props.children}</div>;
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Card;
