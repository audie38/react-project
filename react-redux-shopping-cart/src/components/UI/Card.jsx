import classes from "./Card.module.css";
import PropTypes from "prop-types";

const Card = (props) => {
  return <section className={`${classes.card} ${props.className ? props.className : ""}`}>{props.children}</section>;
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Card;
