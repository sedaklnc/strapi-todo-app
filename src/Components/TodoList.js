import React, { useState } from "react";
import TodoForm from "./TodoForm";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);

  return (
    <div>
      <h1>Hola What Do You Want To Do</h1>
      <TodoForm todoList={todoList} setTodoList={setTodoList} />

      {todoList.map((todo) => (
        <li className="todo-list" key={todo.id}>
          <input
            type="text"
            onChange={(e) => e.preventDefault()}
            value={todo.text}
          />
          <div>
            <button className="complete">tamamla</button>
            <button className="change-input">degistir</button>
            <button className="delete-input">sil</button>
          </div>
        </li>
      ))}
    </div>
  );
}
