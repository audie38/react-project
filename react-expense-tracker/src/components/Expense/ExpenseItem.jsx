import "./Expense.css";
import PropTypes from "prop-types";

import Card from "../UI/Card";

const ExpenseItem = ({ data }) => {
  const currDate = data.date;
  const currYear = currDate.getFullYear();
  const currMonth = currDate.toLocaleString("default", { month: "long" });
  const currDateVal = currDate.getDate();

  return (
    <Card className="expense-item-container bg-secondary">
      <div className="date-container">
        <span className="date-month">{currMonth}</span>
        <span className="date-year">{currYear}</span>
        <span className="date">{currDateVal}</span>
      </div>
      <div className="expense-desc">
        <h2 className="expense-desc__title">{data.title}</h2>
        <div className="expense-amount">
          <span className="expense-curr">$</span>
          {data.amount}
        </div>
      </div>
    </Card>
  );
};

ExpenseItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ExpenseItem;
