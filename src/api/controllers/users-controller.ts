import { Request, Response } from 'express';
import UserRepository from '../repositories/user-repository';

class UsersController {
    async storeUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserRepository.storeUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

export default new UsersController();