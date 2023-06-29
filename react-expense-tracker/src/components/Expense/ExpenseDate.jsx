import PropTypes from "prop-types";

const ExpenseDate = ({ currDate }) => {
  const currYear = currDate.getFullYear();
  const currMonth = currDate.toLocaleString("default", { month: "long" });
  const currDateVal = currDate.getDate();
  return (
    <div className="d-flex flex-column text-center bg-dark text-light p-3 rounded-5">
      <span className="h2">{currMonth}</span>
      <span className="h4">{currYear}</span>
      <span className="h1">{currDateVal}</span>
    </div>
  );
};

ExpenseDate.propTypes = {
  currDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
};

export default ExpenseDate;
