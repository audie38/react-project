import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

const TodoForm = ({ onAddTodo }) => {
  const [error, setError] = useState(null);

  const titleInput = useRef();
  const descInput = useRef();

  const errorHandler = () => {
    setError(null);
  };

  const showHandler = (e) => {
    e.preventDefault();

    const title = titleInput.current.value;
    const desc = descInput.current.value;

    if (title.trim().length === 0 || desc.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter valid title and description (non-empty values).",
      });
      return;
    }

    onAddTodo({
      title: title,
      desc: desc,
    });

    titleInput.current.value = "";
    descInput.current.value = "";
  };

  return (
    <>
      {error && <Modal title={error.title} msg={error.message} onConfirm={errorHandler} />}
      <Card>
        <form onSubmit={showHandler}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" ref={titleInput} />
          </div>
          <div className="input-group">
            <label htmlFor="Desc">Description</label>
            <textarea rows={5} id="Desc" ref={descInput} />
          </div>
          <button className="btn btn-add" type="submit">
            Add Todo
          </button>
        </form>
      </Card>
    </>
  );
};

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default TodoForm;
