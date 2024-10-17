const express = require('express');
const UsersController = require('../controllers/users-controller');

const usersRoutes = express.Router();

usersRoutes.post('/login', UsersController.login);
usersRoutes.post('/signup', UsersController.store);
usersRoutes.post('/refresh', UsersController.refreshToken);

module.exports = usersRoutes;