import Kernl_Logo from './assets/kernl_logo.svg'
import './index.css'
import ToDoList from './ToDoList.jsx'

function App() {

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={Kernl_Logo} className="base" width="170" height="179" alt="" />
        </div>
        <ToDoList />
      </section>
    </>
  )
}

export default App
