
import Kernl_Logo from './assets/kernl_logo.svg'
import { useNavigate } from 'react-router-dom';
import './index.css'

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <>
            <div className="ControleCenter">
                <img src={Kernl_Logo} className="Logo" width="170" height="179" alt="" />
                <button className="ControleCenterButton" onClick={() => navigate('/Kernl/ToDoList')}>ToDoList</button>
                <button className="ControleCenterButton" onClick={() => navigate('/Kernl')}>Home</button>
            </div>
            <div className='Spacer'></div>
        </>

    )
}