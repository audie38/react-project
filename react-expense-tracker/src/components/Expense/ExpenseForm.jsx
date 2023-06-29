import Card from "../UI/Card";
import { useState } from "react";
import PropTypes from "prop-types";

const ExpenseForm = ({ submit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const submitHandler = () => {
    submit({
      title,
      amount: +amount,
      date: new Date(date),
    });

    setTitle("");
    setAmount(0);
    setDate("");
  };

  return (
    <Card className="bg-dark rounded-bottom-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
        className="p-5 text-light"
      >
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input className="form-control" type="text" name="title" id="title" value={title} onChange={titleChangeHandler} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="amount">
            Amount
          </label>
          <input className="form-control" type="text" name="amount" id="amount" value={amount} onChange={amountChangeHandler} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input className="form-control" type="date" min="2021-01-01" max="2023-12-31" name="date" id="date" value={date} onChange={dateChangeHandler} />
        </div>

        <button type="submit" className="btn btn-primary w-100 my-3">
          Submit
        </button>
      </form>
    </Card>
  );
};

ExpenseForm.propTypes = {
  submit: PropTypes.func,
};

export default ExpenseForm;
