import Todo from "./Todo";
import PropTypes from "prop-types";

const TodoList = ({ data }) => {
  return <div className="todo-container">{data.length > 0 && data.map((dt, idx) => <Todo key={idx} data={dt} />)}</div>;
};

TodoList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TodoList;
