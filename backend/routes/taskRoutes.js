const express = require('express');
const router = express.Router();

const {createTask, getTask, updatetask, deleteTask} = require('../controllers/taskController.js');

router.post('/', createTask);
router.get('/', getTask);
router.put('/:id', updatetask);
router.delete('/:id', deleteTask);

module.exports = router;