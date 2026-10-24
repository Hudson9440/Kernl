import { useState, useEffect } from "react";
import CloseIcon from "./assets/close-icon.svg";
import NavBar from "./NavagationBar.jsx";
import { DayPicker } from "react-day-picker";
import axios from "axios";
import "react-day-picker/style.css";
import "./ToDoList.css";
import "./Global.css";

const API_URL = "/api/tasks/";

function toDateKey(d) {
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const dayOfMonth = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${dayOfMonth}`;
}

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [AddFormisOpen, setAddFormIsOpen] = useState(false);
  const [deleteTaskMode, setDeleteTaskMode] = useState(false);
  const [editTaskMode, setEditTaskMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
  const [day, setday] = useState(new Date());
  const [selected, setSelected] = useState(new Date());

  const visibleTasks = tasks.filter((task) => task.date === toDateKey(day));

  async function fetchItems() {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function WriteData(e) {
    e.preventDefault();
    if (name.trim() === "") return;
    try {
      const response = await axios.post(API_URL, {
        name,
        description,
        priority,
        date: toDateKey(day),
      });
      setTasks((t) => [...t, response.data]);
      setName("");
      setDescription("");
      setPriority("High");
      closeAddTask();
      console.log("Successfully added Task:", response.data);
    } catch (error) {
      console.error(
        "Error writing data:",
        error.response?.data ?? error.message,
      );
    }
  }

  async function DeleteData(id) {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setTasks((t) => t.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  async function UpdateCheckBoxState(id, changes) {
    try {
      const response = await axios.patch(`${API_URL}${id}/`, changes);
      setTasks((t) => t.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response?.data ?? error.message,
      );
    }
  }

  async function UpdateData(id) {
    try {
      const response = await axios.patch(`${API_URL}${id}/`, {
        name,
        description,
        priority,
      });
      setTasks((t) => t.map((task) => (task.id === id ? response.data : task)));
      return true;
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response?.data ?? error.message
      );
      return false;
    }
  }

  function openEditForm(task) {
    setEditingTaskId(task.id);
    setName(task.name);
    setDescription(task.description);
    setPriority(task.priority);
    setEditTaskMode(true);
  }

  function ExitEditTaskMode() {
    setName("");
    setDescription("");
    setPriority("High");
    setEditingTaskId(null);
    setEditTaskMode(false);
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    if (name.trim() === "") return;
    const ok = await UpdateData(editingTaskId);
    if (ok) ExitEditTaskMode();
  }

  function openAddTask() {
    setAddFormIsOpen(true);
  }

  function closeAddTask() {
    setAddFormIsOpen(false);
  }

  function handleSubmitDate(event) {
    event.preventDefault();
    if (selected) setday(selected);
    setIsDateSelectorOpen(false);
  }

  function swapDeleteTaskMode() {
    setDeleteTaskMode((mode) => !mode);
  }

  return (
    <>
      <NavBar />
      <div className="ToDoList">
        <button
          className="SubtleButton Text"
          onClick={() => setIsDateSelectorOpen(true)}
        >
          {day.toLocaleDateString()}
        </button>

        {isDateSelectorOpen && (
          <div className="Overlay">
            <div className="AddForm">
              <form className="AddFormContent" onSubmit={handleSubmitDate}>
                <button
                  className="ExitButton"
                  type="button"
                  onClick={() => setIsDateSelectorOpen(false)}
                >
                  <img src={CloseIcon} alt="Close" />
                </button>
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  defaultMonth={new Date()}
                  footer={
                    selected
                      ? `Selected: ${selected.toLocaleDateString()}`
                      : "Pick a day."
                  }
                />
                <button type="submit" className="SubtleButton">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        {editTaskMode && (
          <div className="Overlay">
            <div className="AddForm">
              <button
                className="ExitButton"
                type="button"
                onClick={ExitEditTaskMode}
              >
                <img src={CloseIcon} alt="Close" />
              </button>
              <form className="AddFormContent" onSubmit={handleEditSubmit}>
                <input
                  className="FormInputText"
                  type="text"
                  autoFocus
                  placeholder="Enter Task Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="EditPriority">Priority </label>
                <select
                  name="Priority"
                  id="EditPriority"
                  className="FormInputPriority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <div>
                  <button type="submit" className="SubtleButton Text">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {AddFormisOpen && (
          <div className="Overlay">
            <div className="AddForm">
              <button
                className="ExitButton"
                type="button"
                onClick={closeAddTask}
              >
                <img src={CloseIcon} alt="Close" />
              </button>
              <form className="AddFormContent" onSubmit={WriteData}>
                <input
                  className="FormInputText"
                  type="text"
                  autoFocus
                  placeholder="Enter Task Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="Priority">Priority </label>
                <select
                  name="Priority"
                  id="Priority"
                  className="FormInputPriority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <div>
                  <button type="submit" className="SubtleButton Text">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ol className="Task-List">
          {visibleTasks.map((task) => (
            <li
              className="Task"
              key={task.id}
              onDoubleClick={() => openEditForm(task)}
            >
              <input
                type="checkbox"
                className="Checkbox"
                checked={task.done}
                onChange={() =>
                  UpdateCheckBoxState(task.id, { done: !task.done })
                }
                onDoubleClick={(e) => e.stopPropagation()}
              />
              <span className="Task-Name">{task.name}</span>
              <span className="Priority">{task.priority}</span>
              {deleteTaskMode && (
                <span className="Delete">
                  <button
                    className="DeleteTaskButton"
                    onClick={() => DeleteData(task.id)}
                  >
                    Delete Task
                  </button>
                </span>
              )}
            </li>
          ))}
        </ol>
        {visibleTasks.length === 0 && (
          <p className="Text">Relax No Tasks For Today.</p>
        )}

        <button className="SubtleButton Text" onClick={openAddTask}>
          + Add a task
        </button>
        <button className="SubtleButton Text" onClick={swapDeleteTaskMode}>
          - Delete a task
        </button>
      </div>
    </>
  );
}

export default ToDoList;
