import PropTypes from "prop-types";

import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";

const ExpenseItem = ({ data }) => {
  const currDate = data.date;

  const clickHandler = () => {
    console.log(`ExpenseId : ${data.id}`);
  };

  return (
    <Card className="bg-secondary p-3 my-3">
      <div className="row">
        <div className="d-flex align-items-center gap-2">
          <div className="col-md-3 col-sm-3 w-25">
            <ExpenseDate currDate={currDate} />
          </div>
          <div className="col-md-6 col-sm-6">
            <h2 className="text-light" onClick={clickHandler}>
              {data.title}
            </h2>
          </div>
          <div className="col-md-3 col-sm-3 pe-2 ms-auto">
            <div className="btn btn-primary w-100 p-3 rounded-5 fs-4 fw-bold">
              <span>$ {data.amount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="expense-desc"></div>
    </Card>
  );
};

ExpenseItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ExpenseItem;
