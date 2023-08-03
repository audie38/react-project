import PropTypes from "prop-types";

const Card = (props) => {
  return <div className="card p-5 shadow-lg rounded-5">{props.children}</div>;
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Card;
