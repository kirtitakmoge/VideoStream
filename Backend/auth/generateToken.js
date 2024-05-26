const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
// Secret key for JWT
const secretKey = process.env.JWT_SECRETE_KEY; // Replace with your own secret key

// Middleware to generate JWT token
const generateToken = (user) => {
    console.log(secretKey);
    console.log(user)
    const payload = {
        firstname: user.firstname,
        email: user.email
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1d' });
};

module.exports = generateToken;
