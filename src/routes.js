'use strict'

const express = require('express');
const appRoutes = express.Router();
const fireAuthMiddleware = require('./api/middlewares/fire-auth-middleware');

const usersRoutes = require('./api/routes/users-routes');
const todoRoutes = require('./api/routes/todo-routes');

const uploadFileRoutes = require('./api/routes/upload-routes');

appRoutes.get('/', async (request, response) => response.send('Hello'));
appRoutes.get('/api', async (request, response) => {
    return response.send('it works');
});

appRoutes.use('/api/auth', fireAuthMiddleware, usersRoutes);
appRoutes.use('/api/todo', fireAuthMiddleware, todoRoutes);
appRoutes.use('/api/files', uploadFileRoutes);

module.exports = appRoutes;