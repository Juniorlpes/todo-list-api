const UserService = require('../services/user-service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

function generateToken(params = {}) {
    return jwt.sign(params, process.env.AUTH_CRYPT_SECRET, {
        expiresIn: 78300,
    });
}

class UsersController {
    async login(req, res) { };
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