const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware.js');
const { startSession, endSession, getSessions } = require('../controllers/focusController.js');

router.use(isAuthenticated);

router.post('/start', startSession);
router.post('/end/:sessionId', endSession);
router.get('/', getSessions);

module.exports = router;