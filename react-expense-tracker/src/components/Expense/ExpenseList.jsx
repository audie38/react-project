import PropTypes from "prop-types";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ data }) => {
  return (
    <div className="bg-dark">
      {data.length === 0 && <h3 className="h3 text-light">No Expenses Found</h3>}
      {data.length > 0 && data.map((item) => <ExpenseItem key={item.id} data={item} />)}
    </div>
  );
};

ExpenseList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ExpenseList;
