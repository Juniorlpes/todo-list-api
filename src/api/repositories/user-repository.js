const User = require('../models/user');
const RestError = require('../errors/rest-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

function generateToken(params = {}, expiresIn = 86400) {
    return jwt.sign(params, process.env.AUTH_CRYPT_SECRET, {
        expiresIn: expiresIn,
    });
}

class UserRepository {
    async storeUser(userData) {
        const { id, email, name } = userData;

        let user = await User.findOne({ where: { id: id } });

        if (!user)
            user = await User.create({
                id: id,
                email: email,
                name: name,
            });

        const { createdAt, updatedAt, ...result } = user.get({ plain: true });
        return result;
    };

    /**
    * @deprecated
    */
    async createUser(email, password) {
        const user = await User.create({ email, password });

        const accessToken = generateToken({ id: user.id, type: "access" });
        const refreshToken = generateToken({ id: user.id, type: "refresh" }, '40d');

        return {
            user: {
                ...user.get(),
                password: undefined,
                updatedAt: undefined,
                createdAt: undefined,
            },
            token: {
                accessToken,
                refreshToken,
            },
        };
    };

    /**
    * @deprecated
    */
    async login(email, password) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new RestError('Invalid E-mail or password', 400);
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new RestError('Invalid E-mail or password', 400);
        }

        const accessToken = generateToken({ id: user.id, type: "access" });
        const refreshToken = generateToken({ id: user.id, type: "refresh" }, '40d');

        return {
            user: {
                ...user.get(),
                password: undefined,
                updatedAt: undefined,
                createdAt: undefined,
            },
            token: {
                accessToken,
                refreshToken,
            },
        };
    };

    /**
    * @deprecated
    */
    async refreshToken(refreshToken) {
        //I would have put the refresh token in db to compare...

        try {
            const decoded = jwt.verify(refreshToken, process.env.AUTH_CRYPT_SECRET);

            if (decoded.type !== "refresh" || !decoded.id) {
                throw new RestError('Invalid request', 400);
            }

            const accessToken = generateToken({ id: decoded.id, type: "access" });
            const newRefreshToken = generateToken({ id: decoded.id, type: "refresh" }, '40d');

            return {
                accessToken,
                newRefreshToken,
            };
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new RestError('Token Expired, login again', 400);
            } else if (error.name === 'JsonWebTokenError') {
                throw new RestError('Invalid token', 400);
            }
            throw error;
        }
    }
}

module.exports = new UserRepository();