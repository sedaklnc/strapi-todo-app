import React, { useState } from "react";

export default function TodoForm(props) {
  const [item, setItem] = useState("");

  const handleSubmit = (e) => {
    // prevent refresh page
    e.preventDefault();
    props.setTodoList([
      ...props.todoList,
      { id: Math.floor(Math.random() * 10000), text: item, completed: false },
    ]);
    setItem("");
  };

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        value={item}
        placeholder="Add items"
        onChange={handleChange}
      ></input>
      <button>Add todo</button>
    </form>
  );
}
