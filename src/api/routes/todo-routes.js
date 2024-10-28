const express = require('express');
const TodoController = require('../controllers/todo-controller');

const todoRoutes = express.Router();

todoRoutes.post('/', TodoController.create);
todoRoutes.get('/', TodoController.getAllByOwnerId);
todoRoutes.delete('/:id', TodoController.delete);
todoRoutes.put('/', TodoController.update);
todoRoutes.put('/all', TodoController.updateAll);

module.exports = todoRoutes;