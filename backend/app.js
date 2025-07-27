const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes.js');
const errorHandler = require('./middlewares/errorHandler.js');

dotenv.config();

const app = express();

// middleware required
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// routes
app.use('/api/tasks', taskRoutes);

// error handler
app.use(errorHandler); 

module.exports = app;
