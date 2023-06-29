import PropTypes from "prop-types";
import { useState } from "react";

import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseChart from "./ExpenseChart";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const ExpenseContainer = ({ expenses, addExp }) => {
  const [showForm, setShowForm] = useState(false);
  const [filteredYear, setFilteredYear] = useState("2021");

  const toggleShow = () => {
    setShowForm(!showForm);
  };

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const submitForm = (data) => {
    const dataObj = {
      id: +new Date(),
      ...data,
    };
    console.log(dataObj);
    addExp(dataObj);
  };

  return (
    <>
      <Card className="d-flex bg-primary text-light py-3">
        <button onClick={toggleShow} className="btn btn-primary fs-3 w-50 mx-auto">
          {showForm ? "Back" : "Add New Expense"}
        </button>
      </Card>

      {showForm ? (
        <ExpenseForm submit={submitForm} />
      ) : (
        <Card className="bg-dark px-5 py-3">
          <ExpenseFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
          <ExpenseChart />
          <ExpenseList data={expenses} />
        </Card>
      )}
    </>
  );
};

ExpenseContainer.propTypes = {
  expenses: PropTypes.array.isRequired,
  addExp: PropTypes.func.isRequired,
};

export default ExpenseContainer;
