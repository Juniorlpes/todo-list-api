const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provider' });
    }
    const parts = authHeader.split(' ');

    if (!parts.length == 2) {
        return res.status(401).send({ error: 'Token error!' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Unformatted Token' });
    }

    jwt.verify(token, process.env.AUTH_CRYPT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid Token' });

        req.userId = decoded.id;
        console.log(decoded.id)

        return next();
    });

};
