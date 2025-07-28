const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
    },
    duration: {
        type: Number,
    }
}, { timestamps: true });

module.exports = mongoose.model('FocusSession', focusSessionSchema);