import PropTypes from "prop-types";

const ExpenseFilter = ({ selected, onChangeFilter }) => {
  const onSelect = (event) => {
    onChangeFilter(event.target.value);
  };

  return (
    <div className="d-flex mt-3">
      <h3>Filter by year</h3>
      <select onChange={onSelect} value={selected} name="year" className="rounded-3 w-25 ms-auto">
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>
    </div>
  );
};

ExpenseFilter.propTypes = {
  selected: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default ExpenseFilter;
