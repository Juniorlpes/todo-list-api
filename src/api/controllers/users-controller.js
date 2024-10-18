const UserService = require('../services/user-service');
var emailValidator = require("email-validator");
require('dotenv/config');

class UsersController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const { user, token } = await UserService.login(email, password);
            user.token = token;

            return res.status(200).send(user);
        } catch (error) {
            return res.status(error.statusCode || 500).send(error.message || error);
        }
    };
    async store(req, res) {
        try {
            const { email, password } = req.body;

            if (!emailValidator.validate(email)) {
                return res.status(400).send('Invalid Email');
            }

            const { user, token } = await UserService.createUser(email, password);
            user.token = token;

            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    };
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(401).send({ error: 'Refresh token not sent' });
            }

            const tokens = await UserService.refreshToken(refreshToken);

            return res.status(200).send(tokens);
        } catch (error) {
            return res.status(error.statusCode || 500).send(error.message || error);
        }
    };
}

module.exports = new UsersController();