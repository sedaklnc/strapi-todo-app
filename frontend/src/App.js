import "./App.css";
import TodoList from "./Components/TodoList";
import axios from "axios";
import { useEffect } from "react";

function App() {
  return (
    <div className="m-auto max-h-96 scrollbar scrollbar-thumb-pink-600 scrollbar-track-transparent hover:scrollbar-thumb-blue-600 scrollbar-track-rounded-md ease-in duration-300  scrollbar-thumb-rounded   mt-28 pb-4 shadow-2xl shadow-purple-500/40   bg-white rounded-lg w-96 ">
      {/*  <Todo /> */}
      {/*   <TodoForm /> */}
      <TodoList />
    </div>
  );
}

export default App;
