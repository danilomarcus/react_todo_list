import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "./Button"
import { FaBackward } from 'react-icons/fa'

function TaskDetails() {

    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})
    const [error, setError] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      const fetchTask = async () => {
        const res = await fetch(`http://localhost:5000/tasks/${params.id}`)
        const data = await res.json()
               
        setTask(data)
        setLoading(false)
      }

      fetchTask()
    })

    return loading ? (
        <h3>Loading...</h3>
    ) :
    (
        <div>
            <h3>{task.text}</h3>
            <h3>{task.day}</h3>
            
            <Button onClick={() => {
                navigate('/')
            }} text='Go Back' />
        </div>
    )
}

export default TaskDetails