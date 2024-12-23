const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
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
            // password: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            // },
        }, {
            sequelize,
            tableName: 'users',
            timestamps: true,
            // hooks: {
            //     beforeCreate: (user) => {
            //         const salt = bcrypt.genSaltSync();
            //         user.password = bcrypt.hashSync(user.password, salt);
            //     }
            // }
        })
    }

    static associate(models) {
        this.hasMany(models.Todo, { foreignKey: 'ownerId', as: 'todos' });
    }
}

module.exports = User;