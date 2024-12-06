import { Sequelize } from 'sequelize';
import 'dotenv/config';

import User from '../api/models/user';
import Todo from '../api/models/todo';

// Inicializa a conexão com o banco de dados usando a connection string do .env
const connection = new Sequelize(process.env.DB_CONNECTION_STRING as string);

// Teste de conexão (opcional, mas útil para debug)
// (async () => {
//     try {
//         await connection.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })();

const models = {
    User,
    Todo,
};

// Inicializa os modelos
Object.values(models).forEach((model) => {
    model.initModel(connection);
});

// Configure as associações
Object.values(models).forEach((model) => {
    if ('associate' in model) {
        model.associate(models);
    }
});

export default connection;