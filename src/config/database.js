require('dotenv').config();

//Not used
const old_mysql_config = {
    host: "localhost",
    dialect: 'mysql',
    username: 'root',
    password: 'admin123.',
    port: 3306,
    database: 'todos_scheme',
    define: {
        timestamp: true,
        underscored: true,
    },
}

module.exports = {
    use_env_variable: 'DB_CONNECTION_STRING',
    dialect: 'postgres',
}