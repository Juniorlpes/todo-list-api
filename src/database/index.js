const Sequelize = require('sequelize');
require('dotenv/config');

const User = require('../api/models/user');
const TodoModel = require('../api/models/todo');

const connection = new Sequelize(process.env.DB_CONNECTION_STRING);

// try {
//     connection.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

User.init(connection);
TodoModel.init(connection);

module.exports = connection;