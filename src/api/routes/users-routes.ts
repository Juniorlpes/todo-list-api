import { Router } from 'express';
import UsersController from '../controllers/users-controller';

const usersRoutes = Router();

usersRoutes.post('/register', UsersController.storeUser);

export default usersRoutes;