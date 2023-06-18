import "./Expense.css";

const ExpenseFilter = () => {
  return (
    <div className="expense-filter">
      <h3>Filter by year</h3>
      <select name="year" id="expenseYear">
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>
    </div>
  );
};

export default ExpenseFilter;
