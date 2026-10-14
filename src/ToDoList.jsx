import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(["mike"]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  return (
    <div>
      <h1>ToDo List</h1>
      <input
        type="text"
        placeholder="Enter Task Name"
        value={newTask}
        onChange={handleInputChange}
      ></input>
      <button onClick={addTask}>ADD</button>
      <div>
        <ol className="Task-List">
          {tasks.map((task, index) => (
            <li className="Task" key={index}>
              <span className="TaskName">{task}</span>
              <button className="Delete-Button">Delete</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default ToDoList;
