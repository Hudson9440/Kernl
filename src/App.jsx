import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import ToDoList from './ToDoList.jsx'
import Home from './Home.jsx'




export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Kernl" element={<Home />} />
        <Route path="/Kernl/ToDoList" element={<ToDoList />} />
      </Routes>
    </BrowserRouter>
  )
}