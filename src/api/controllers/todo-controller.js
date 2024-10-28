const TodoRepository = require('../repositories/todo-repository');

class TodoController {
    async getAllByOwnerId(req, res) {
        try {
            const userId = req.userId;

            const todos = await TodoRepository.getAllByUser(userId);

            return res.status(200).send(todos);
        } catch (error) {
            return res.status(error.statusCode || 500).send(error.message || error);
        }
    };
    async create(req, res) {
        try {
            const { id, todo, done, order } = req.body;

            const result = await TodoRepository.create({
                id,
                todo,
                done,
                order,
                ownerId: req.userId
            });

            return res.status(201).send(result);
        } catch (error) {
            return res.status(error.statusCode || 500).send(error.message || error);
        }
    };
    async delete(req, res) {
        try {
            const { id } = req.params;

            await TodoRepository.delete(id);

            return res.status(200).send();
        } catch (error) {
            return res.status(error.statusCode || 500).send(error.message || error);
        }
    };
    async update(req, res) {
        try {
            const { id, todo, done } = req.body;

            await TodoRepository.update({
                id,
                todo,
                done
            });

            return res.status(200).send();
        } catch (error) {
            return res.status(error.statusCode || 500).send(error.message || error);
        }
    };
    async updateAll(req, res) {
        try {
            const todos = req.body.map(item => {
                const { id, todo, done, order } = item;
                return { id, todo, done, order }; // ou realizar outras operações
            });

            await TodoRepository.updateAll(todos);

            return res.status(200).send();
        } catch (error) {
            return res.status(error.statusCode || 500).send(error.message || error);
        }
    };
}

module.exports = new TodoController();