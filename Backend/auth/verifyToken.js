const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

// Secret key for JWT
const secretKey = process.env.JWT_SECRETE_KEY;
// Secret key for JWT
 // Replace with your own secret key

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    console.log("inverify:",req.headers.authorization);
    const authHeader = req.headers?.authorization;
 console.log(secretKey)
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
        
       
       return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
       
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key
        const decoded =jwt.verify(token,secretKey);

        // Attach the decoded user information to the request object
        
        req.user = decoded;
        console.log("verified");
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If verification fails, respond with an error
        return res.status(401).json({ message: 'Unauthorized: Invalid token or Authentication Failed' });
    }
};

module.exports = verifyToken;
