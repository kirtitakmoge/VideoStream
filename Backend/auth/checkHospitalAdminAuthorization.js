const { isValidObjectId } = require("mongoose");
const User = require("../models/User");

const checkHospitalAdminAuthorization = async (req, res, next) => {
    try {
        const adminId = req.params.adminId;

        // Check if adminId is a valid ObjectId
        if (!isValidObjectId(adminId)) {
            return res.status(400).json({ error: "Invalid admin ID" });
        }

        // Find the user with the given adminId
        const admin = await User.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        console.log(admin);
        const hospitalId = req.params.hospitalId;

        // Check if the authenticated admin has authority for the requested hospital
        if (admin.hospitalId.toString() === hospitalId) {
            next();
        } else {
            return res.status(403).json({ error: "You are not authorized to access this hospital" });
        }
    } catch (error) {
        console.error("Error in checkHospitalAdminAuthorization middleware:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = checkHospitalAdminAuthorization;
