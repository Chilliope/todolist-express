const express = require('express');
const router = express.Router();
const todolistController = require('../controllers/todolistController')

router.get('/', todolistController.getAllTodolists);
router.post('/', todolistController.createTodolist);
router.put('/:id', todolistController.updateTodolist);
router.put('/status/:id', todolistController.updateTodolistStatus);

module.exports = router;
