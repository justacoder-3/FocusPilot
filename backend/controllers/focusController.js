const FocusSession = require('../models/focusSessionModel.js');

// starting the session
exports.startSession = async (req, res) => {
    try {
        const session = new FocusSession ({
            user: req.user._id,
            startTime: new Date(),
        });
        await session.save();
        res.status(201).json({ message: 'Focus session started', session });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Could not start the session' });
    }
}

// ending the session
exports.endSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await FocusSession.findOne({
            _id: sessionId,
            user: req.user._id,
        });

        if (!session || session.endTime) {
            return res.status(400).json({ message: 'Invalid or already session has ended' });
        }

        const endTime = new Date();
        const duration = Math.floor((endTime - session.startTime) / 60000);

        session.endTime = endTime;
        session.duration = duration;

        await session.save();

        res.json({ message: 'Session ended', session });
    }
    catch (err) {
        res.status(500).json({ message: 'Could not end session' });
    }
};

// getting all the sessions
exports.getSessions = async (req, res) => {
    try {
        const sessions = await FocusSession.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(sessions);
    }
    catch (err) {
        res.status(500).json({ message: 'Could not fetch sessions' });
    }
};