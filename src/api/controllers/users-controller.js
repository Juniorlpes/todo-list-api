const UserRepository = require('../repositories/user-repository');
require('dotenv/config');

class UsersController {
    async storeUser(req, res) {
        try {
            const user = await UserRepository.storeUser(req.body);

            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    };
}

module.exports = new UsersController();