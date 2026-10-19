
import Kernl_Logo from './assets/kernl_logo.svg'
import { useNavigate } from 'react-router-dom';
import './Global.css'

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <>
            <div className="ControleCenter">
                <img src={Kernl_Logo} className="Logo" alt="" />
                <button className="ControleCenterButton" onClick={() => navigate('/ToDoList')}>ToDoList</button>
                <button className="ControleCenterButton" onClick={() => navigate('/Calendar')}>Calendar</button>
                <button className="ControleCenterButton" onClick={() => navigate('/')}>Home</button>
            </div>
            <div className='Spacer'></div>
        </>

    )
}