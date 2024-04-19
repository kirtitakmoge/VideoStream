const jwt = require('jsonwebtoken');

// Secret key for JWT
const secretKey = 'KirtiTakmogeSuhasShelke'; // Replace with your own secret key

// Middleware to generate JWT token
const generateToken = (user) => {
    console.log(user)
    const payload = {
        firstname: user.firstname,
        email: user.email
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

module.exports = generateToken;
