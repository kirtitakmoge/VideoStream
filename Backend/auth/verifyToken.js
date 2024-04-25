const jwt = require('jsonwebtoken');

// Secret key for JWT
const secretKey = 'KirtiTakmogeSuhasShelke'; // Replace with your own secret key

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
 
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
        
       console.log(authHeader);
       return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
       
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, secretKey);
        
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
