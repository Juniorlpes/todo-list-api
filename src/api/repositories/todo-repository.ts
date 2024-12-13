import TodoModel from '../models/todo';
import RestError from '../errors/rest-errors';

interface Todo {
    id: string;
    ownerId?: string;
    order?: number;
    [key: string]: any; // Permite propriedades adicionais
}

class TodoRepository {
    async getAllByUser(userId: string): Promise<Todo[]> {
        return await TodoModel.findAll({
            where: {
                ownerId: userId,
            },
            order: [['order', 'ASC']],
            // ,include: User,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
    }
    async delete(todoId: string): Promise<number> {
        return await TodoModel.destroy({
            where: {
                id: todoId,
            },
        });
    }
    async update(todo: Partial<Todo>): Promise<Todo[]> {
        const [affectedCount, updatedTodos] = await TodoModel.update(
            todo,
            {
                where: {
                    id: todo.id,
                },
                returning: true, // Retorna os dados atualizados
            }
        );
    
        if (affectedCount === 0) {
            throw new RestError('Todo not found', 404);
        }
    
        // Exclui os campos `createdAt` e `updatedAt` dos resultados
        return updatedTodos.map(todo => {
            const { createdAt, updatedAt, ...result } = todo.get({ plain: true });
            return result;
        });
    }
    async create(todo: Partial<Todo>): Promise<Omit<Todo, 'createdAt' | 'updatedAt'>> {
        const newTodo = await TodoModel.create(todo);

        const { createdAt, updatedAt, ...result } = newTodo.get({ plain: true });
        return result;
    }
    async updateAll(todos: Todo[]): Promise<void> {
        for (const item of todos) {
            await this.update(item);
        }
    }
    async getById(todoId: string): Promise<Todo> {
        const todo = await TodoModel.findByPk(todoId, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        if (todo === null) {
            throw new RestError('Not Found', 404);
        }
        return todo;
    }
}

export default new TodoRepository();