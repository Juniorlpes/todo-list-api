const UserRepository = require('../repositories/user-repository');
const RestError = require('../errors/rest-errors');
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
    };
    async login(email, password) {
        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new RestError('E-mail ou senha incorreto!', 400);
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new RestError('E-mail ou senha incorreto!', 400);
        }

        return {
            user: {
                ...user.get(),
                password: undefined,
                updatedAt: undefined,
                createdAt: undefined,
            },
            token: generateToken({ id: user.id }),
        };
    }
}

module.exports = new UserService();