import { Response } from "express";
import AuthenticatedRequest from "../shared/autenticated-request";
import TodoRepository from "../repositories/todo-repository";

class TodoController {
  async getAllByOwnerId(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.userId as string;

      const todos = await TodoRepository.getAllByUser(userId);

      res.status(200).send(todos);
    } catch (error: any) {
      res.status(error.statusCode || 500).send(error.message || error);
    }
  }
  async getById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const todo = await TodoRepository.getById(id);

      res.status(200).send(todo);
    } catch (error: any) {
      res.status(error.statusCode || 500).send(error.message || error);
    }
  }
  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id, todo, done, order } = req.body;

      const result = await TodoRepository.create({
        id,
        todo,
        done,
        order,
        ownerId: req.userId as string,
      });

      res.status(201).send(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).send(error.message || error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await TodoRepository.delete(id);

      res.status(200).send();
    } catch (error: any) {
      res.status(error.statusCode || 500).send(error.message || error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id, todo, done } = req.body;

      await TodoRepository.update({
        id,
        todo,
        done,
      });

      res.status(200).send();
    } catch (error: any) {
      res.status(error.statusCode || 500).send(error.message || error);
    }
  }

  async updateAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const todos = req.body.map((item: any) => {
        const { id, todo, done, order } = item;
        return { id, todo, done, order }; // ou realizar outras operações
      });

      await TodoRepository.updateAll(todos);

      res.status(200).send();
    } catch (error: any) {
      res.status(error.statusCode || 500).send(error.message || error);
    }
  }
}

export default new TodoController();
