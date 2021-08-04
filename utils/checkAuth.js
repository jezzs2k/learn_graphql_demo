const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const config = require('config');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];

        if (token) {
            const user = jwt.verify(token, config.Customer.secret.key);

            return user;
        } else {
            throw new Error("Authentication token must be 'Bearer [token]'");
        }
    }

    throw new Error("Authentication header must be provided");
}