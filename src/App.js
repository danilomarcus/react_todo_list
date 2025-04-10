import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  console.log(API_URL);
  console.log(`${window.location.origin}`);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks from json server
  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`)
    const data = await res.json()

    return data
  }

  // Fetch single Task
  const fetchTask = async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}`)
    const data = await res.json()

    return data
  }

   // Add Task
   const addTask = async (task) => {
    console.log(task)
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // console.log(id)
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    })
    // We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )

  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask) }
        showAdd={showAddTask} />
        
        <Routes>
          <Route 
          path="/" 
          element={
            <>
              { showAddTask && <AddTask onAdd={addTask} /> }
              { tasks.length > 0 ? 
                ( <Tasks tasks={tasks} 
                    onDelete={deleteTask}
                    onToggle={toggleReminder} />
                ) : (
                  'No tasks to show, you are doing great' 
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />        
          <Route path='/task/:id' element={<TaskDetails />} />        
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
