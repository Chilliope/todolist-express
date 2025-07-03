const express = require('express');
const router = express.Router();
const todolistController = require('../controllers/todolistController')

router.get('/', todolistController.getAllTodolists);
router.post('/', todolistController.createTodolist);

module.exports = router;
