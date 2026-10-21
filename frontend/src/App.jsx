import { HashRouter, Routes, Route} from 'react-router-dom';
import './Global.css'
import ToDoList from './ToDoList.jsx'
import Home from './Home.jsx'
import Calendar from './Calendar.jsx';




export default function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ToDoList" element={<ToDoList />} />
        <Route path="/Calendar" element={<Calendar />} />
      </Routes>
    </HashRouter>
  )
}