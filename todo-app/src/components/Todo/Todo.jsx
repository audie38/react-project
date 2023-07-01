import PropTypes from "prop-types";
import Card from "../UI/Card";

const Todo = ({ data }) => {
  return (
    <Card>
      <div className="todo-item-container">
        <h3>{data.title}</h3>
        <hr />
        <p>{data.desc}</p>
      </div>
    </Card>
  );
};

Todo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Todo;
