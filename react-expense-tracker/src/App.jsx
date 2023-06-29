import { useState } from "react";
import ExpenseContainer from "./components/Expense/ExpenseContainer";

const dummyData = [
  {
    id: "e1",
    title: "Dummy",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  const [expenses, setExpenses] = useState(dummyData);

  const addExpense = (data) => {
    setExpenses((prevExp) => {
      return [data, ...prevExp];
    });
  };

  return (
    <div className="container my-5">
      <ExpenseContainer expenses={expenses} addExp={addExpense} />
    </div>
  );
}

export default App;
