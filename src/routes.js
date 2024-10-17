'use strict'

const express = require('express');
const appRoutes = express.Router();

const usersRoutes = require('./api/routes/users-routes');

appRoutes.get('/', async (request, response) => response.send('Hello'));
appRoutes.get('/api', async (request, response) => {
    return response.send('it works');
});

appRoutes.use('/api', usersRoutes);

module.exports = appRoutes;