import { Router, Request, Response } from 'express';

import isAuthenticated from './api/middlewares/fire-auth-middleware';
import usersRoutes from './api/routes/users-routes';
import todoRoutes from './api/routes/todo-routes';

const appRoutes = Router();

appRoutes.get('/', async (req: Request, res: Response): Promise<void> => {
    res.send('Hello');
});

appRoutes.get('/api', async (request: Request, response: Response): Promise<void> => {
    response.send('it works');
});

appRoutes.use('/api/auth', isAuthenticated, usersRoutes);
appRoutes.use('/api/todo', isAuthenticated, todoRoutes);

export default appRoutes;