import { DataTypes, Model, Sequelize, BelongsToGetAssociationMixin } from 'sequelize';
import User from './user'; // Importe o modelo relacionado

export default class Todo extends Model {
    public id!: string;
    public todo!: string;
    public done!: boolean;
    public order!: number;
    public ownerId!: string;

    // Métodos auxiliares fornecidos pelo Sequelize
    public getOwner!: BelongsToGetAssociationMixin<User>; 

    // Associação reversa (belongsTo)
    public owner?: User;

    // Inicializa o modelo
    static initModel(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    allowNull: false,
                },
                todo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                done: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                order: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                ownerId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
            },
            {
                sequelize,
                tableName: 'todos',
                timestamps: true, 
            }
        );
    }

    // Define as associações
    static associate(models: { User: typeof User }) {
        this.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    }
}
