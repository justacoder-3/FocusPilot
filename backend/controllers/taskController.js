const Task = require('../models/taskModel.js');

// creating the task (create)
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(task);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// getting all the tasks (read)
exports.getTask = async (req, res) => {
    try {
        const query = { user: req.user._id };

        if (req.query.status) {
            query.status = req.query.status;
        }

        if (req.query.priority) {
            query.priority = req.query.priority;
        }

        let sort = {};
        if (req.query.sortBy === 'dueDate') {
            sort.dueDate = 1;
        }

        if (req.query.sortBy === 'createdAt') {
            sort.createdAt = -1;
        }

        const tasks = await Task.find(query).sort(sort);
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// getting a specific task
exports.getSpecificTask = async (req, res) => {
    try {
        const specificTask = await Task.findOne({ _id: req.params.id, user: req.user._id });

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
        const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user._id },
            req.body,
            { new: true });
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
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTaskStats =  async (req, res) => {
    try {
        const now = new Date();
        const overdue = tasks.filter(task => task.dueDate && task.dueDate < now && task.status !== 'completed').length;

        const tasks = await Task.find({ user: req.user._id });

        const total = tasks.length;
        const completed = tasks.filter(task => task.status === 'completed').length;
        const pending = total - completed;

        const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

        res.json({
            totalTasks: total,
            completedTasks: completed,
            pendingTasks: pending,
            overdueTasks: overdue,
            completionRate
        });
    }
    catch (err) {
        console.error("Error fetching task stats:", err);
        res.status(500).json({ message: "Error fetching task stats" });
    }
};


