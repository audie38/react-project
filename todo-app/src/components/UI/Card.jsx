import PropTypes from "prop-types";

const Card = (props) => {
  return <div className="card">{props.children}</div>;
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Card;
