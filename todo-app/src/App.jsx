import { useState } from "react";
import TodoForm from "./components/Todo/TodoForm";
import TodoList from "./components/Todo/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);

  const onAddTodoHandler = (newTodo) => {
    setTodos((prevTodo) => [...prevTodo, newTodo]);
  };

  return (
    <div className="container">
      <TodoForm onAddTodo={onAddTodoHandler} />
      {todos.length > 0 && <TodoList data={todos} />}
    </div>
  );
}
