import "./Expense.css";
import PropTypes from "prop-types";

import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseChart from "./ExpenseChart";
import ExpenseList from "./ExpenseList";

const ExpenseContainer = ({ expenses }) => {
  return (
    <Card className="expense-container bg-dark">
      <ExpenseFilter />
      <ExpenseChart />
      <ExpenseList data={expenses} />
    </Card>
  );
};

ExpenseContainer.propTypes = {
  expenses: PropTypes.array.isRequired,
};

export default ExpenseContainer;
