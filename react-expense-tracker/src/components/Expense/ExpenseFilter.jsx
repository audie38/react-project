import PropTypes from "prop-types";

const ExpenseFilter = ({ selected, onChangeFilter }) => {
  const onSelect = (event) => {
    onChangeFilter(event.target.value);
  };

  return (
    <div className="d-flex mt-3">
      <h3 className="h3 text-light">Filter by year</h3>
      <select onChange={onSelect} value={selected} name="year" className="rounded-5 w-25 text-center ms-auto">
        <option value="">All</option>
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
