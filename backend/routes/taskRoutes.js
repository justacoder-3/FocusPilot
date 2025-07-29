const express = require('express');
const router = express.Router();

const {createTask, getTask, getSpecificTask, updateTask, deleteTask } = require('../controllers/taskController.js');
const { isAuthenticated } = require('../middlewares/authMiddleware.js');

router.use(isAuthenticated);

router.post('/createTask', createTask);
router.get('/', getTask);
router.get('/:id', getSpecificTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;