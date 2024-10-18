'use strict'

const express = require('express');
const appRoutes = express.Router();
const authMiddleware = require('./api/middlewares/auth_middleware');

const usersRoutes = require('./api/routes/users-routes');
const todoRoutes = require('./api/routes/todo-routes');

appRoutes.get('/', async (request, response) => response.send('Hello'));
appRoutes.get('/api', async (request, response) => {
    return response.send('it works');
});

appRoutes.use('/api', usersRoutes);
appRoutes.use('/api/todo', authMiddleware, todoRoutes);

module.exports = appRoutes;