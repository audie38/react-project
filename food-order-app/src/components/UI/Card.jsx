import PropTypes from "prop-types";

export default function Card(props) {
  const className = `card p-5 rounded-4 shadow-sm ${props.className}`;
  return <div className={className}>{props.children}</div>;
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
