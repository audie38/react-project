import PropTypes from "prop-types";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ data }) => {
  return (
    <div className="bg-dark">
      {data.map((item) => (
        <ExpenseItem key={item.id} data={item} />
      ))}
    </div>
  );
};

ExpenseList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ExpenseList;
