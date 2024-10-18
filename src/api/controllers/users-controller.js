const UserService = require('../services/user-service');
require('dotenv/config');

class UsersController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const { user, token } = await UserService.login(email, password);
            user.token = token;

            return res.status(201).send(user);
        } catch (error) {
            return res.status(error.statusCode || 500).send(error.message || error);
        }
    };
    async store(req, res) {
        try {
            const { email, password } = req.body;

            const { user, token } = await UserService.createUser(email, password);
            user.token = token;

            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    };
    async refreshToken(req, res) { };
}

module.exports = new UsersController();