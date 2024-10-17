const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'users',
            timestamps: true,
            hooks: {
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        })
    }

    static associate(models) {
        // this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
        // this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
    }
}

module.exports = User;