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

exports.getStats = async (req, res) => {
    try {
        const now = new Date();
        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        
        const sessions = await FocusSession.find({ user: req.user._id });

        let totalToday = 0;
        let totalWeek = 0;
        const dailyMap = {};

        sessions.forEach (session => {
            if (!session.endTime || !session.duration) {
                return;
            }

            const sessionDate = new Date(session.startTime);
            const dateKey = sessionDate.toISOString().split('T')[0];

            if (!dailyMap[dateKey]) {
                dailyMap[dateKey] = 0;
            }
            dailyMap[dateKey] += session.duration;

            if (sessionDate >= startOfToday) {
                totalToday += session.duration;
            }

            if (sessionDate >= startOfWeek) {
                totalWeek += session.duration;
            }
        });


        let bestDay = null;
        let bestDuration = 0;
        for (const [day, minutes] of Object.entries(dailyMap)) {
            if (minutes > bestDuration) {
                bestDuration = minutes;
                bestDay = day;
            }
        }

        res.json({
            totalToday,
            totalWeek,
            averageDaily: Math.round(totalWeek/7),
            bestDay,
            bestDuration
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error getting stats' });
    }
};