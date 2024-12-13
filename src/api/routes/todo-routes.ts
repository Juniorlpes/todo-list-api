import { Router } from 'express';

import TodoController from '../controllers/todo-controller';

const todoRoutes = Router();

todoRoutes.post('/', TodoController.create);
todoRoutes.get('/', TodoController.getAllByOwnerId);
todoRoutes.get('/:id', TodoController.getById);
todoRoutes.delete('/:id', TodoController.delete);
todoRoutes.put('/', TodoController.update);
todoRoutes.put('/all', TodoController.updateAll);

export default todoRoutes;