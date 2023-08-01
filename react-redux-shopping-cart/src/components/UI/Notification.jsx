import classes from "./Notification.module.css";
import PropTypes from "prop-types";

const Notification = (props) => {
  let specialClasses = "";

  if (props.status === "error") {
    specialClasses = classes.error;
  }
  if (props.status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

Notification.propTypes = {
  status: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

export default Notification;
