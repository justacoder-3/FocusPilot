import { useEffect, useState } from "react";
import { getAllTasks } from '../services/taskService.js';
import TaskCard from '../components/TaskCard.jsx';
import TaskForm from "../components/TaskForm.jsx";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getAllTasks();
                setTasks(data);
            }
            catch (err) {
                console.error('Failed to fetch tasks', err);
            }
        };
        fetchTasks(); 
    }, []);

const handleTaskCreated = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
};

    return (
        <div>
            <h1>Welcome to your DashBoard</h1>

            <TaskForm onTaskCreated={handleTaskCreated} />

            <div>
                {tasks.map(task => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;