const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema (
    {
        title: {
            type: String,
            required: [true, 'Task must have a title'],
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending',
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            dafault: 'medium',
        },
        dueDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);