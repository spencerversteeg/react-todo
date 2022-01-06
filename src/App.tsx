import React, { useState } from "react";
import TodoItem from "./@types/TodoItem";
import TodoItemProps from "./@types/TodoItem";
import { useSavedState } from "./hooks/savedState";

const App: React.FC = () => {
  const [todos, setTodos] = useSavedState([], "todos");
  const [newTodo, setNewTodo] = useState<TodoItemProps>({
    id: todos.length > 0 ? todos.length : -1,
    value: "",
    status: false,
  });

  // Filter for **only** the complete items, and fetch the length.
  const itemsComplete = todos.filter((t: TodoItem) => t.status).length;

  // When the todo input changes, update the state.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // Stop the defaults from the browser
    event.preventDefault();

    // Track the input state on input change
    setNewTodo({ id: newTodo.id, value: event.target.value, status: false });
  };

  // On form submission, add the todo and reset the form valie.
  const handleSubmit = (event: React.SyntheticEvent): void => {
    // Stop the defaults from the browser
    event.preventDefault();

    // Set the new todos list, then reset the new todo form.
    setTodos([...todos, newTodo]);
    setNewTodo({
      id: todos.length,
      value: "",
      status: false,
    });
  };

  // When the "x" is clicked, remove the item from the todos.
  const handleRemoveClick = (_event: React.MouseEvent, id: number) => {
    setTodos(todos.filter((t: TodoItem) => t.id !== id));
  };

  // Whenever a list item is clicked, mark the status complete/incomplete (true/false)
  const handleStatusClick = (_event: React.MouseEvent, id: number) => {
    let items = [...todos];
    let itemIndex = todos.findIndex((t: TodoItem) => t.id === id);
    let item: TodoItem = todos[itemIndex];
    item.status = !item.status;

    setTodos(items);
  };

  return (
    <main>
      <div className="github-link">
        <a
          href="https://github.com/spencerversteeg/react-todo"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
              fill="white"
            />
          </svg>
          Visit me on GitHub
        </a>
      </div>
      {/* Page header container */}
      <header>
        <h1>React Todo App</h1>
        <h2>
          Created by{" "}
          <a
            href="https://spencerversteeg.com/"
            target="_blankl"
            rel="noreferrer"
          >
            Spencer Versteeg
          </a>
        </h2>
        <span>
          Complete: {itemsComplete}/{todos.length}
        </span>
      </header>
      {/* New Todo Container */}
      <div className="new-todo">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter a new task</label>
          {/* Added these items into a div in order to align them horizontally */}
          <div className="new-todo__h">
            <input
              type="text"
              onChange={handleChange}
              value={newTodo.value}
              required
            />
            {/* Clicking the enter key will also submit the form, but it is good practice to have an actual submit button. */}
            <button type="submit">+</button>
          </div>
        </form>
      </div>
      {/* TODOS List */}
      <ul className="todos">
        {/* Map each TODO and render the list item. */}
        {todos.map((todo: TodoItem) => {
          return (
            <li
              className={todo.status ? "todo todo--complete" : "todo"}
              key={todo.id}
            >
              {/* Attached to handler to remove item. */}
              <span onClick={(e) => handleRemoveClick(e, todo.id)}>
                &times;
              </span>
              {/* Attached to handler to toggle item status. */}
              <p onClick={(e) => handleStatusClick(e, todo.id)}>{todo.value}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default App;
