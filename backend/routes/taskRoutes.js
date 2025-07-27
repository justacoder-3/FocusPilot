const express = require('express');
const router = express.Router();

const {createTask, getTask, updateTask, deleteTask} = require('../controllers/taskController.js');

router.post('/', createTask);
router.get('/', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;