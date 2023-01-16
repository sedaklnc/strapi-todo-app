import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { MdOutlineDoneAll } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [edit, setEdit] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get("http://localhost:1337/api/todos");
      setTodos(data);
      console.log(data);
    };
    getTodos();
  }, []);
  const handleDelete = ({ id }) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleChange = ({ id }) => {
    const findTodo = todoList.find((todo) => todo.id === id);
    setEdit(findTodo);
  };

  /*  useEffect(() => {
    console.log(todoList);
  }, [todoList]) */ return (
    <div>
      <h1>Hola What Do You Want To Do</h1>
      <TodoForm
        todoList={todoList}
        setTodoList={setTodoList}
        editTodo={edit}
        setEdit={setEdit}
      />

      {todoList.map((todo, index) => (
        <li className="todo-list" key={todo.id}>
          <input
            type="text"
            onChange={(e) => e.preventDefault()}
            value={todo.text}
          />
          <div>
            <button
              className="complete" /* onClick={() => handleComplete(todo)} */
            >
              <MdOutlineDoneAll />
            </button>
            <button className="change-input" onClick={() => handleChange(todo)}>
              <AiOutlineEdit />
            </button>
            <button className="delete-input" onClick={() => handleDelete(todo)}>
              <RiDeleteBin5Line />
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}
