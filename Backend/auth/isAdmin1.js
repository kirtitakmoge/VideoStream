const { isValidObjectId } = require('mongoose');
const User = require('../models/User');

const isAdmin1= async (req, res, next) => {
    try {
        const adminId = req.params.adminId;

        // Check if adminId is a valid ObjectId
        if (!isValidObjectId(adminId)) {
            console.log("invalid",adminId)
            return res.status(400).json({ error: "Invalid admin ID" });
        }

        // Find the user by ID
        const user = await User.findById(adminId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user's role is "Hospital Admin"
        if (user.role === "Hospital Admin") {
            next();
        } else {
            return res.status(403).json({ error: "You are not a hospital admin" });
        }
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = isAdmin1;
