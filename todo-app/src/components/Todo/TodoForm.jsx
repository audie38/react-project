import { useState } from "react";
import PropTypes from "prop-types";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const descHandler = (event) => {
    setDesc(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  const showHandler = (e) => {
    e.preventDefault();

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

    setTitle("");
    setDesc("");
  };

  return (
    <>
      {error && <Modal title={error.title} msg={error.message} onConfirm={errorHandler} />}
      <Card>
        <form onSubmit={showHandler}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={title} onChange={titleHandler} />
          </div>
          <div className="input-group">
            <label htmlFor="Desc">Description</label>
            <textarea rows={5} id="Desc" value={desc} onChange={descHandler} />
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
