const Task = require('../models/taskModel.js');

// creating the task (create)
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// getting all the tasks (read)
exports.getTask = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// getting a specific task
exports.getSpecificTask = async (req, res) => {
    try {
        const specificTask = await Task.findById(req.params.id);

        if (!specificTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(specificTask);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// updating the tasks (update)
exports.updateTask = async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// deleting the tasks (delete)
exports.deleteTask = async (req, res) => {
    try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};


