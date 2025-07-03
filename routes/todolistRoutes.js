const express = require('express');
const router = express.Router();
const todolistController = require('../controllers/todolistController')

router.get('/', todolistController.getAllTodolists);
router.post('/', todolistController.createTodolist);
router.put('/:id', todolistController.updateTodolist);
router.put('/status/:id', todolistController.updateTodolistStatus);
router.delete('/:id', todolistController.deleteTodolist);

module.exports = router;
