import './index.css'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavagationBar.jsx';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
        <button className="ControleCenterButton" onClick={() => navigate('/Kernl/ToDoList')}>ToDoList</button>
        <button className="ControleCenterButton" onClick={() => navigate('/Kernl')}>Home</button>
        <NavBar/>
        <h1 className='Title'>Welcome to Kernl!</h1>
    </div>
  );
}

export default Home;