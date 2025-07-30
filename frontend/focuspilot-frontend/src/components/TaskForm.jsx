import { useState } from "react";
import { createTask } from '../services/taskService.js';

const TaskForm = ({ onTaskCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        decscription: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
    });

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const newTask = await createTask(formData);
            onTaskCreated({
                title: '',
                description: '',
                status: 'pending',
                priority: 'medium',
                dueDate: '',
            });
        }
        catch (err) {
            console.error('Error creating task:', err);   
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input 
                type="text"
                name="title"
                placeholder="Task title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="decription"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            ></textarea>
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
            </select>
            <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;