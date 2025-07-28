const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes.js');
const errorHandler = require('./middlewares/errorHandler.js');
const authRoutes = require('./routes/authRoutes.js');
const focusRoutes = require('./routes/focusRoutes.js');

dotenv.config();

const app = express();

// middleware required
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/focus', focusRoutes);

// error handler
// app.use(errorHandler); 

module.exports = app;
