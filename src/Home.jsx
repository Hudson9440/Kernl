import './Home.css';
import NavBar from './NavagationBar.jsx';
import './Global.css'

export default function Home() {

  return (
    <div>
        <NavBar/>
        <h1 className='Text'>Welcome to Kernl!</h1>
        <p className='Text'>Kernl Is Designed to be a one stop shop for all your productivity and organizational needs.</p>
        <p className='Text'>Simply navagate around using the Navagation Bar at the top of your screen or your search engines forward and backwards arrows and ENJOY</p>
    </div>
  );
}
