import { Router, Request, Response } from 'express';

const appRoutes = Router();

const fireAuthMiddleware = require('./api/middlewares/fire-auth-middleware');

const usersRoutes = require('./api/routes/users-routes');
const todoRoutes = require('./api/routes/todo-routes');

appRoutes.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.send('Hello');
});

appRoutes.get('/api', async (request: Request, response: Response) => {
    return response.send('it works');
});

appRoutes.use('/api/auth', fireAuthMiddleware, usersRoutes);
appRoutes.use('/api/todo', fireAuthMiddleware, todoRoutes);

export default appRoutes;