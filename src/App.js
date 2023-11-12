import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from "react"

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState(
    [
        {
            "id": 1,
            "text": "Doctors Appointment",
            "day": "Feb 5th at 2:30pm",
            "reminder": true
          },
          {
            "id": 2,
            "text": "Meeting at School",
            "day": "Feb 6th at 1:30pm",
            "reminder": true
          }
    ]
  )

   // Add Task
   const addTask = async (task) => {
    console.log(task)
    // const res = await fetch('http://localhost:5000/tasks', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(task),
    // })

    // const data = await res.json()

    // setTasks([...tasks, data])

    const id = Math.floor(Math.random() * 10000) + 1
    console.log(id)
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id))

    // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'DELETE',
    // })
    //We should control the response status to decide if we will change the state or not.
    // res.status === 200
    //   ? setTasks(tasks.filter((task) => task.id !== id))
    //   : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    setTasks(tasks.map((task) => 
      task.id === id 
      ? { ...task, reminder: !task.reminder} 
      : task
    ))

    // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'DELETE',
    // })
    //We should control the response status to decide if we will change the state or not.
    // res.status === 200
    //   ? setTasks(tasks.filter((task) => task.id !== id))
    //   : alert('Error Deleting This Task')
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask) }
       showAdd={showAddTask} />
      { showAddTask && <AddTask onAdd={addTask} /> }
      {
        tasks.length > 0
         ?  <Tasks tasks={tasks} 
            onDelete={deleteTask}
            onToggle={toggleReminder} />
         : 'No tasks to show'
      }
    </div>
  );
}

export default App;
