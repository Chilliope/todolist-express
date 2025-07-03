const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const todolistRoutes = require('./routes/todolistRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/todolist', todolistRoutes)

module.exports = app;
