const User = require('../models/user');

class UserRepository {
    async create(data) {
        return User.create(data);
    }
}

module.exports = new UserRepository();