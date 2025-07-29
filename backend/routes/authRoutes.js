const express = require('express');
const router = express.Router();
const { register, login, getMyProfile } = require('../controllers/authController.js');
const { isAuthenticated } = require('../middlewares/authMiddleware.js');

router.post('/register', register);
router.post('/login', login);

router.get('/me', isAuthenticated, getMyProfile);

module.exports = router;
