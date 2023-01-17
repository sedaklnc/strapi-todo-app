import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsListStars } from "react-icons/bs";

export default function TodoForm(props) {
  const [item, setItem] = useState("");

  const updateTodo = async (content, id, completed) => {
    await axios.put(`http://localhost:1337/api/todos/${id}`, {
      data: { content: content, completed: completed },
    });

    const newTodo = props.todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          attributes: {
            ...todo.attributes,
            content: content,
            completed: completed,
            updatedAt: new Date(),
          },
        };
      } else return todo;
    });

    props.setTodoList(newTodo);
    props.setEdit("");
  };

  useEffect(() => {
    if (props.editTodo) {
      console.log(props.editTodo);
      setItem(props.editTodo.attributes.content);
    } else {
      setItem("");
    }
  }, [props.editTodo]);

  const createTodos = async (content) => {
    const { data } = await axios.post("http://localhost:1337/api/todos", {
      data: { content: content },
    });

    console.log(data);
    return data.data;
  };

  const handleSubmit = async (e) => {
    // prevent refresh page
    e.preventDefault();

    if (!props.editTodo) {
      const todo = await createTodos(item);
      props.setTodoList([...props.todoList, todo]);
      setItem("");
    } else {
      updateTodo(item, props.editTodo.id, props.editTodo.attributes.completed);
    }
  };

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <form
      className="flex flex-col justify-center items-center mt-10"
      onSubmit={handleSubmit}
    >
      {" "}
      <h1 className="marker:text-5xl pb-11 text-center font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
        Hola What Do You Want To Do
      </h1>
      <div className="relative w-80">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
          <BsListStars className="fill-ring-blue-500 w-5 h-8" />
        </div>
        <input
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
          value={item}
          placeholder="Add items"
          onChange={handleChange}
        ></input>
        <button className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2 ">
          {props.editTodo ? "OK" : "Add"}
        </button>
      </div>
    </form>
  );
}
