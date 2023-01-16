import "./App.css";
import Todo from "./Components/Todo";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import axios from "axios";
import { useEffect } from "react";

function App() {
  return (
    <div>
      {/*  <Todo /> */}
      {/*   <TodoForm /> */}
      <TodoList />
    </div>
  );
}

export default App;
