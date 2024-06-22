const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
// Secret key for JWT
const secretKey = process.env.JWT_SECRETE_KEY; // Replace with your own secret key
const jitsiDomain='meet.surgi-cloud.com';
// Middleware to generate JWT token
const generateToken = (user) => {
    console.log(secretKey);
    console.log(user)
    const payload = {
        sub: jitsiDomain,
        room:"kirti",
        context: {
            user: {
                id: user._id,
                name: user.email,
            },
        },
        iss: '5216',
        aud: '5216',
        exp: Math.floor(Date.now() / 1000) + (60 * 60),  // Expiration time (1 hour from now)
        nbf: Math.floor(Date.now() / 1000) - 10, // Not before time (10 seconds ago to ensure clock sync)
    };

    return jwt.sign(payload, secretKey);
};

module.exports = generateToken;
