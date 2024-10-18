const User = require('../models/user');

class UserRepository {
    async create(data) {
        return User.create(data);
    };
    async findByEmail(email) {
        return User.findOne({ where: { email } });
    };
}

module.exports = new UserRepository();