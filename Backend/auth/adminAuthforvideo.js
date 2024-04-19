const { model } = require("mongoose");
const User = require("../models/User");
const Video = require("../models/Video");


// Middleware function to check if the user has authority to update or delete the video
const adminAuthforvideo= async (req, res, next) => {
    try {
        const adminId=req.params.adminId;
        const videoId=req.params.videoId; // Assuming userId is obtained from authentication middleware
        

        // Find the video by ID
        const video = await Video.findById(videoId);
        const admin=await User.findById(adminId);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }


        // Check if the hospital associated with the video matches the hospital associated with the authenticated hospital admin
        if (video.hospitalID.toString() !== admin.hospitalId.toString()) {
            return res.status(403).json({ error: 'Unauthorized access for this hospital ' });
        }

        // If the user has authority, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error checking video authority:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports=adminAuthforvideo;