import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(["mike"]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  const [AddFormisOpen, setAddFormIsOpen] = useState(false);

  function openAddTask() {
    setAddFormIsOpen(true);
  }

  function closeAddTask() {
    setAddFormIsOpen(false);
  }

  function handleSubmit() {
    event.preventDefault()
    addTask();
    closeAddTask();
  }

  function addTask() {
    
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
      console.log("submited");
    }
    console.log("submited2");
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1>ToDo List</h1>
      <button className="AddButton" onClick={openAddTask}>
        ADD
      </button>
      {AddFormisOpen && (
        <div className="Overlay">
          <div className="AddForm">
            <button className="ExitButton" onClick={closeAddTask}>
              <img src="src/assets/close-icon.svg"/>
            </button>
            <div className="AddFormContent">
              <form onSubmit={handleSubmit}>
                <input
                  className="FormInput"
                  type="text"
                  autoFocus
                  placeholder="Enter Task Name"
                  value={newTask}
                  onChange={handleInputChange}
                ></input>
              </form>
            </div>
          </div>
        </div>
      )}
      <ol className="Task-List">
        {tasks.map((task, index) => (
          <li className="Task" key={index}>
            <input
              type="checkbox"
              className="Checkbox"
              onClick={() => deleteTask(index)}
              checked={false}
              readOnly
            ></input>
            {/* () => becasue without ity it calles the function instantly */}
            <span className="Task-Name">{task}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
