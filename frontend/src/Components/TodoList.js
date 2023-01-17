import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { MdOutlineDoneAll } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [edit, setEdit] = useState(null);
  /*  const [todos, setTodos] = useState([]); */

  const getTodos = async () => {
    const { data } = await axios.get("http://localhost:1337/api/todos");
    setTodoList(data.data);
    console.log(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:1337/api/todos/${id}`);
    await getTodos();
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleChange = ({ id }) => {
    const findTodo = todoList.find((todo) => todo.id === id);
    setEdit(findTodo);
  };

  return (
    <div>
      <TodoForm
        todoList={todoList}
        setTodoList={setTodoList}
        editTodo={edit}
        setEdit={setEdit}
      />

      {todoList.map((todo) => (
        <li
          className="list-none ml-7 mt-3 p-4 flex items-center justify-between"
          key={todo.id}
        >
          <span
            className="text-lg font-serif hover:text-blue-600"
            type="text"
            /* onChange={(e) => e.preventDefault()}
            value={todo.text} */
          >
            {todo.attributes.content}
          </span>

          <div className="flex flex-row">
            <button
            /* onClick={() => handleComplete(todo)} */
            >
              <MdOutlineDoneAll className="  h-5 w-10 fill-purple-600 rounded hover:fill-pink-600" />
            </button>
            <button className="change-input" onClick={() => handleChange(todo)}>
              <AiOutlineEdit className="  h-5 w-10 fill-pink-600 hover:fill-blue-600 rounded" />
            </button>
            <button
              className="delete-input"
              onClick={() => handleDelete(todo.id)}
            >
              <RiDeleteBin5Line className="  h-5 w-10 fill-blue-600 hover:fill-purple-600 rounded" />
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}
