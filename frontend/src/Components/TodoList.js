import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { MdOutlineDoneAll } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [edit, setEdit] = useState(null);

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

  const handleChange = (id) => {
    setEdit(todoList.find((todo) => todo.id === id));
  };

  const handleComplete = async (todo) => {
    await axios.put(`http://localhost:1337/api/todos/${todo.id}`, {
      data: { completed: !todo.attributes.completed },
    });
    await getTodos();
  };

  return (
    <div>
      <TodoForm
        todoList={todoList}
        setTodoList={setTodoList}
        editTodo={edit}
        setEdit={setEdit}
      />

      <ul className="flex flex-col gap-y-4 max-h-60 h-60 overflow-y-auto list-none  scrollbar-thin  scrollbar-thumb-pink-600 scrollbar-track-transparent hover:scrollbar-thumb-blue-600 scrollbar-track-rounded-md ease-in duration-300  scrollbar-thumb-rounded shadow-2xl shadow-purple-500/40  ">
        {todoList.map((todo) => (
          <li
            className=" ml-7 p-4 flex items-center justify-between"
            key={todo.id}
          >
            <span
              className={`text-lg font-serif hover:text-blue-600 ${
                todo.attributes.completed ? "line-through" : ""
              }`}
              type="text"
            >
              {todo.attributes.content}
            </span>

            <div className="flex flex-row">
              <button onClick={() => handleComplete(todo)}>
                <MdOutlineDoneAll className="  h-5 w-10 fill-purple-600 rounded hover:fill-pink-600" />
              </button>
              <button onClick={() => handleChange(todo.id)}>
                <AiOutlineEdit className="  h-5 w-10 fill-pink-600 hover:fill-blue-600 rounded" />
              </button>
              <button onClick={() => handleDelete(todo.id)}>
                <RiDeleteBin5Line className="  h-5 w-10 fill-blue-600 hover:fill-purple-600 rounded" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
