const express = require('express');
const router = express.Router();
const todolistController = require('../controllers/todolistController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', isAuthenticated, todolistController.getAllTodolists);
router.post('/', isAuthenticated, todolistController.createTodolist);
router.put('/:id', isAuthenticated, todolistController.updateTodolist);
router.put('/status/:id', isAuthenticated, todolistController.updateTodolistStatus);
router.delete('/:id', isAuthenticated, todolistController.deleteTodolist);

module.exports = router;
