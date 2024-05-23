import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  function saveToLS() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function handleChange(event) {
    setTodo(event.target.value);
  }
  function handleCheckbox(event) {
    let id = event.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }
  function toggleFinished() {
    setshowFinished(!showFinished);
  }
  function handleEdit(event, id) {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }
  function handleDelete(event, id) {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }
  function handleAdd() {
    setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }]);
    setTodo("");
    saveToLS();
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-300 min-h-[80vh] md:w-[60%]">
        <h1 className="font-bold text-center text-3xl">
          TaskFlow{" "}
          <span className="font-light">- Manage your tasks at one place </span>
        </h1>
        <div className="addTodo flex flex-col justify-center items-center my-5 gap-4">
          <h2 className="text-2xl font-bold ">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="Add a todo"
            className="w-full rounded-full bg-slate-300 border border-gray-500 text-gray-900 text-lg focus:ring-blue-700 focus:border-blue-700 placeholder:text-gray-500 px-2 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="w-1/6 bg-blue-900 hover:bg-blue-950 py-2 text-white rounded-md  disabled:bg-gray-500 "
          >
            Add
          </button>
        </div>
        <input
          type="checkbox"
          checked={showFinished}
          id="show"
          onChange={toggleFinished}
          className="mt-4 me-2 w-4 h-4 text-blue-700 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
        />
        <label htmlFor="show">Show Finished</label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h1 className="text-2xl font-bold my-6 text-center">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && (
            <div className="text-center text-gray-500 font-thin">
              No tasks to display
            </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex lg:w-full md:w-1/2 my-3 justify-between"
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                      onChange={handleCheckbox}
                      className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <div className=" inline-block mx-3 font-bold">
                      <span className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </span>
                    </div>
                  </div>
                  <div className="buttons flex">
                    <button
                      className="bg-blue-900 hover:bg-blue-950 px-4 py-2 text-white rounded-md mx-1 "
                      onClick={(e) => handleEdit(e, item.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-blue-900 hover:bg-blue-950 px-4 py-2 text-white rounded-md mx-1 "
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
