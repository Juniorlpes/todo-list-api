const UserRepository = require('../repositories/user-repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

function generateToken(params = {}) {
    return jwt.sign(params, process.env.AUTH_CRYPT_SECRET, {
        expiresIn: 86400,
    });
}

class UserService {
    async createUser(email, password) {
        const user = await UserRepository.create({ email, password });

        const token = generateToken({ id: user.id });

        return {
            user: {
                ...user.get(),
                password: undefined,
                updatedAt: undefined,
                createdAt: undefined,
            },
            token,
        };
    }
}

module.exports = new UserService();