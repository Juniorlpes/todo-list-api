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
            attributes: { exclude: ['createdAt', 'updatedAt'] },
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
                },
                returning: true,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }
        )
    };
    async create(todo) {
        const newTodo = await TodoModel.create(todo);

        const { createdAt, updatedAt, ...result } = newTodo.get({ plain: true });
        return result;
    };
    async updateAll(todos) {
        for (const item of todos) {
            await this.update(item);
        }
    };
    async getById(todoId) {
        const todo = await TodoModel.findByPk(todoId, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        if (todo === null) {
            throw new RestError('Not Found', 404);
        }
        return todo;
    };
}

module.exports = new TodoRepository();