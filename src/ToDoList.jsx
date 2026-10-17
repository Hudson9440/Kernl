import { useState } from "react";
import CloseIcon from "./assets/close-icon.svg";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("High");

  const [AddFormisOpen, setAddFormIsOpen] = useState(false);

  function openAddTask() {
    setAddFormIsOpen(true);
  }

  function closeAddTask() {
    setAddFormIsOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addTask();
    closeAddTask();
  }

  function addTask() {
    if (newTaskText.trim() !== "") {
      const newTask = {
        index: `el-${crypto.randomUUID()}`,
        text: newTaskText,
        priority: newTaskPriority,
      };
      setNewTaskText("");
      setTasks((t) => [...t, newTask]);
    }
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <div className="ToDoList">
      <button className="SubtleButton">today</button> {/* Add date selector */}
      {AddFormisOpen && (
        <div className="Overlay">
          <div className="AddForm">
            <button className="ExitButton" onClick={closeAddTask}>
              <img src={CloseIcon} />
            </button>

            <form className="AddFormContent" onSubmit={handleSubmit}>
              <input
                className="FormInputText"
                type="text"
                autoFocus
                placeholder="Enter Task Name"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
              ></input>
              <div className="small-spacer"></div>
              <label for="Priority">Priority </label>
              <select
                name="Priority"
                id="Priority"
                className="FormInputPriority"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <div>
                <button type="submit" className="SubtleButton">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ol className="Task-List">
        {tasks.map((task) => (
          <li className="Task" key={task.index}>
            <input type="checkbox" className="Checkbox"></input>
            {/* () => becasue without ity it calles the function instantly */}
            <span className="Task-Name">{task.text}</span>
            <span className="Priority">{task.priority}</span>
          </li>
        ))}
      </ol>
      <button className="SubtleButton" onClick={openAddTask}>
        + Add a task
      </button>
    </div>
  );
}

export default ToDoList;
