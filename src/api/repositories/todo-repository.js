const TodoModel = require('../models/todo');
const RestError = require('../errors/rest-errors');

class TodoRepository {
    async getAllByUser(userId) {
        return await TodoModel.findAll({
            where: {
                ownerId: userId,
            },
            order: [
                ['order']
            ],
            // ,include: User,
        });
    };
    async delete(todoId) {
        return await TodoModel.destroy({
            where: {
                id: todoId,
            }
        });
    };
    async update(todo) {
        return await TodoModel.update(
            todo,
            {
                where: {
                    id: todo.id
                }
            }
        )
    };
    async create(todo) {
        return await TodoModel.create(todo);
    };
    async updateAll(todos) {
        for (const item of todos) {
            await this.update(item);
        }
    };
    async getById(todoId) {
        const todo = await TodoModel.findByPk(todoId);
        if (todo === null) {
            throw new RestError('Not Found', 404);
        }
        return todo;
    };
}

module.exports = new TodoRepository();