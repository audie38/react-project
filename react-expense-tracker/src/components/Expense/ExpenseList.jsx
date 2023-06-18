import "./Expense.css";
import PropTypes from "prop-types";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <ExpenseItem key={item.id} data={item} />
      ))}
    </>
  );
};

ExpenseList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ExpenseList;
