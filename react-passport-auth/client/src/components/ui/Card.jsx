import PropTypes from "prop-types";

export default function Card(props) {
  return <div className="card">{props.children}</div>;
}

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
