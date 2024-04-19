// Middleware function to verify if user is a Super Admin
const User = require('../models/User');
const { isValidObjectId } = require('mongoose');
const requireSuperAdmin = async(req, res, next) => {
  
    const superAdminId=req.params.superAdminId;
    if(!isValidObjectId(superAdminId))
  {
    console.log("invalid");
   return res.status(400).json({message:"invalid id"});
  }
    const sadmin=await  User.findById(superAdminId);
    console.log("hi super admin",sadmin.role);
    // Assuming that the authenticated user's role is stored in req.user.role
    if (sadmin &&sadmin.role=== 'Super Admin') {
        // User is a Super Admin, proceed to the next middleware or route handler
        console.log("verified")
        next();
    } else {
        // User is not authorized, return 403 Forbidden status
        return res.status(403).json({ error: 'Your not authorized to do this operation only super admin is able to do' });
    }
};

module.exports = requireSuperAdmin;
