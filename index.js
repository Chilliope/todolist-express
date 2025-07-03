const express = require('express');
const app = express();
const todolistRoutes = require('./routes/todolistRoutes');

app.use(express.json());

app.use('/api/todolist', todolistRoutes)

module.exports = app;
