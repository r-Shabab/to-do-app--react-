import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }
  function addTask() {
    if (newTask.trim() !== "") {
      // eslint-disable-next-line no-unused-vars
      setTasks((t) => [...tasks, newTask]);
      setNewTask("");
    }
  }
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }
  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <>
      <div className="to-do-list text-center">
        <h1 className="text-center text-6xl mt-9 pt-4 p-4">To-Do-List</h1>
        <div className="mt-9 flex flex-col justify-center">
          <input
            className="min-w-96"
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}
          />
          <button
            className="add-button max-w-64 bg-cyan-600 hover:bg-cyan-700 text-white"
            type="button"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ol>
          {tasks.map((tasks, index) => (
            <li className="list" key={index}>
              <span className="text">{tasks}</span>{" "}
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button className="up-button" onClick={() => moveTaskUp(index)}>
                ☝️
              </button>
              <button
                className="down-button"
                onClick={() => moveTaskDown(index)}
              >
                👇
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
export default ToDoList;
