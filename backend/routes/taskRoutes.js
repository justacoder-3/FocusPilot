const express = require('express');
const router = express.Router();

const {createTask, getTask, getSpecificTask, updateTask, deleteTask, getTaskStats } = require('../controllers/taskController.js');
const { isAuthenticated } = require('../middlewares/authMiddleware.js');

router.use(isAuthenticated);

router.post('/createTask', createTask);
router.get('/', getTask);
router.get('/taskstats', getTaskStats); // linked with focus session management
router.get('/:id', getSpecificTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);


module.exports = router;