const User = require('../models/user');
const RestError = require('../errors/rest-errors');

// function generateToken(params = {}, expiresIn = 86400) {
//     return jwt.sign(params, process.env.AUTH_CRYPT_SECRET, {
//         expiresIn: expiresIn,
//     });
// }

class UserRepository {
    async storeUser(userData) {
        const { id, email, name } = userData;

        try {
            let user = await User.findOne({ where: { id: id } });

            if (!user)
                user = await User.create({
                    id: id,
                    email: email,
                    name: name,
                });

            const { createdAt, updatedAt, ...result } = user.get({ plain: true });
            return result;
        } catch (error) {
            throw new RestError(`${error}`, 400);
        }
    };

}

module.exports = new UserRepository();