import { useState } from "react";
import CloseIcon from "./assets/close-icon.svg";
import NavBar from "./NavagationBar.jsx";
import { DayPicker } from "react-day-picker";
import axios from 'axios';
import "react-day-picker/style.css";
import './ToDoList.css'
import './Global.css'

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState("High");
  const [done, setDone] = useState(false);
  const [AddFormisOpen, setAddFormIsOpen] = useState(false);


  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error Fetching Data!!: ', error);
    }
  }

  const WriteData = async (e) => {
    e.preventDefault();
    try {
      closeAddTask();
      const response = await axios.post(API_URL, { name, description, priority, done});
      setTasks([...tasks, response.data]);
      setName('');
      setDescription('');
      setPriority("High");
      setDone(false);
      console.log("Successfuly added Task:", response.data);
    } catch (error) {
      console.error('Error writing data:', error.message, error.code, error)
    }
  };

  
  const DeleteData = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setTasks(tasks.filter((item) => item.id !== id)); // Remove deleted item from state
    } catch (error) {
      console.error('Error deleting data!:', error);
    }
  };




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

  function handleSubmitDate(event) {
    event.preventDefault();
    setday(selected);
    setIsDateSelectorOpen(false);
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

  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
  
  const [day, setday] = useState(new Date());
  const [selected, setSelected] = useState(new Date());
   
  return (
    <>
      <NavBar />
      <div className="ToDoList">
        <button className="SubtleButton Text" onClick={() => setIsDateSelectorOpen(true)}>{day.toLocaleDateString()}</button> 
        {isDateSelectorOpen &&
          <div className="Overlay">
            <modal className="AddForm">
              <form className="AddFormContent" onSubmit={handleSubmitDate}>
                <button className="ExitButton" type="button" onClick={() => setIsDateSelectorOpen(false)}> {/* Save Tasks to the day */}
                  <img src={CloseIcon} />
                </button>
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  defaultMonth={new Date()}
                  footer={
                    selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
                  }
                />
                <button type="submit" className="SubtleButton">
                  Submit
                </button>
              </form>
            </modal>
          </div>
        }
        {AddFormisOpen && (
          <div className="Overlay">
            <modal className="AddForm">
              <button className="ExitButton" onClick={closeAddTask}> {/* Make it so anywhere you click it closes and turn div Add Form to Modal*/}
                <img src={CloseIcon} />
              </button>

              <form className="AddFormContent" onSubmit={WriteData}>
                <input
                  className="FormInputText"
                  type="text"
                  autoFocus
                  placeholder="Enter Task Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <label for="Priority">Priority </label>
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
            </modal>
          </div>
        )}
        <ol className="Task-List">
          {tasks.map((task) => (
            <li className="Task" key={task.id}>
              <input type="checkbox" className="Checkbox"></input>
              {/* () => becasue without ity it calles the function instantly */}
              <span className="Task-Name">{task.name}</span>
              <span className="Priority">{task.priority}</span>
            </li>
          ))}
        </ol>
        <button className="SubtleButton Text" onClick={openAddTask}>
          + Add a task
        </button>
        {/* Add a delete task button which adds a checkbox and a final delete button actually deleting all elements selected*/}
      </div>
    </>
  );
}

export default ToDoList;
