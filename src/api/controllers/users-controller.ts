import { Request, Response } from 'express';
import UserRepository from '../repositories/user-repository';

class UsersController {
    async storeUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await UserRepository.storeUser(req.body);
            return res.status(201).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new UsersController();