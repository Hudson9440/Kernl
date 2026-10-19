import { HashRouter, Routes, Route} from 'react-router-dom';
import './Global.css'
import ToDoList from './ToDoList.jsx'
import Home from './Home.jsx'
import Calendar from './Calendar.jsx';




export default function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/Kernl" element={<Home />} />
        <Route path="/Kernl/ToDoList" element={<ToDoList />} />
        <Route path="/Kernl/Calendar" element={<Calendar />} />
      </Routes>
    </HashRouter>
  )
}