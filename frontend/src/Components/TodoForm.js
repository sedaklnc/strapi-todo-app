import React, { useState, useEffect } from "react";

export default function TodoForm(props) {
  const [item, setItem] = useState("");

  const updateTodo = (title, id, completed) => {
    const newTodo = props.todoList.map((todo) => {
      if (todo.id === id) {
        return { text: title, id, completed };
      } else return todo;
    });

    props.setTodoList([...newTodo]);
    props.setEdit("");
  };

  useEffect(() => {
    if (props.editTodo) {
      setItem(props.editTodo.text);
    } else {
      setItem("");
    }
  }, [props.editTodo, setItem]);

  const handleSubmit = (e) => {
    // prevent refresh page
    e.preventDefault();

    if (!props.editTodo) {
      props.setTodoList([
        ...props.todoList,
        { id: Math.floor(Math.random() * 10000), text: item, completed: false },
      ]);
      setItem("");
    } else {
      updateTodo(item, props.editTodo.id, props.editTodo.completed);
    }
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
      <button>{props.editTodo ? "OK" : "Add"}</button>
    </form>
  );
}
