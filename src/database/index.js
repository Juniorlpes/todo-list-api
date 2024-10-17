const Sequelize = require('sequelize');
require('dotenv/config');

const User = require('../api/models/user');

const connection = new Sequelize(process.env.DB_CONNECTION_STRING);

// try {
//     connection.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

User.init(connection);

module.exports = connection;