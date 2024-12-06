import { Model, DataTypes, Sequelize, Association, HasManyGetAssociationsMixin } from 'sequelize';
import Todo from './todo';

export default class User extends Model {
    public id!: string;
    public name!: string;
    public email!: string;

    public getTodos!: HasManyGetAssociationsMixin<Todo>;

    // Associação para o TypeScript
    public todos?: Todo[]; // Relação hasMany

    // Define associações do Sequelize
    public static associations: {
        todos: Association<User, Todo>;
    };

    static initModel(sequelize: Sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        }, // Aqui, garantimos o tipo correto
        {
            sequelize,
            tableName: 'users',
            timestamps: true,
        })
    }

    static associate(models: { Todo: typeof Todo }) {
        this.hasMany(models.Todo, { foreignKey: 'ownerId', as: 'todos' });
    }
}
