const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {

const secret=process.env.JWT_SECRET || "Newsecrettaureansurgical";
  try {
    const authHeader = req.headers?.authorization;
 
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
           
          
          return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' ,sucess:false});
          
       }
   
       const token = authHeader.split(' ')[1];
       console.log(secret);
    const decoded = jwt.verify(token, secret);
    console.log();
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token',sucesss:false});
  }
};

module.exports = authMiddleware;
