import {useState} from 'react'

function My_Component() {

    const [x, setX] = useState(0)

    return (
        <div>
            <h1>My Component</h1>
             <p>there are {x} fruit.</p>
            <button onClick={() => setX(x + 1)}>increase number of fruit</button>
        </div>
    )
}

export default My_Component