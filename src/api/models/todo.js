const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
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
                type: DataTypes.UUID,
                references: { model: 'users', key: 'id' },
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'todos',
            timestamps: true,
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    }
}

module.exports = User;