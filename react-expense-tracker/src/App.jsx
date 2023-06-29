import ExpenseContainer from "./components/Expense/ExpenseContainer";

function App() {
  const expenses = [];

  const addExpense = (data) => {
    expenses.push(data);
  };

  return (
    <div className="container my-5">
      <ExpenseContainer expenses={expenses} addExp={addExpense} />
    </div>
  );
}

export default App;
