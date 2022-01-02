import React, { useState } from "react";
import TodoItem from "./@types/TodoItem";
import TodoItemProps from "./@types/TodoItem";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItemProps[]>([]);
  const [newTodo, setNewTodo] = useState<TodoItemProps>({
    id: -1,
    value: "",
    status: false,
  });
  // const [itemsCompete, setItemsCompete] = useState(initialState)

  const itemsComplete = todos.filter((t) => t.status).length;

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

  // When the "❌" is clicked, remove the item from the todos.
  const handleRemoveClick = (_event: React.MouseEvent, id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleStatusClick = (_event: React.MouseEvent, id: number) => {
    let items = [...todos];
    let itemIndex = todos.findIndex((t) => t.id === id);
    let item: TodoItem = todos[itemIndex];
    item.status = !item.status;

    setTodos(items);
  };

  return (
    <main className="container">
      <header>
        <h1>React Todo App</h1>
        <span>
          Complete: {itemsComplete}/{todos.length}
        </span>
      </header>
      <div className="new-todo">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter a new task</label>
          <div className="new-todo__h">
            <input
              type="text"
              onChange={handleChange}
              value={newTodo.value}
              required
            />
            <button type="submit">+</button>
          </div>
        </form>
      </div>
      <ul className="todos">
        {todos.map((todo) => {
          return (
            <li
              className={todo.status ? "todo todo--complete" : "todo"}
              key={todo.id}
            >
              <span onClick={(e) => handleRemoveClick(e, todo.id)}>
                &times;
              </span>
              <p onClick={(e) => handleStatusClick(e, todo.id)}>{todo.value}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default App;
