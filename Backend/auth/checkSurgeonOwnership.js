const { isValidObjectId } = require("mongoose");
const Video=require("../models/Video");
const checkSurgeonOwnership = async (req, res, next) => {
    try {
        const videoId = req.params.videoId; // Assuming video ID is passed in the URL parameter
        const surgeonId = req.params.surgeonId; 
        console.log(surgeonId);// Assuming user ID is available in the request object (authenticated user)
       if(!isValidObjectId(videoId))
       {
        return res.status(400).json({ error: "Invalid VideoID" });
       }
       if(!isValidObjectId(surgeonId))
       {
        return res.status(400).json({ error: "Invalid surgeonID" });
       }
        // Find the video by ID and ensure that it belongs to the logged-in surgeon
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        if (video.userID.toString() !== surgeonId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to perform this action' });
        }

        // Surgeon owns the video, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error checking surgeon ownership:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports=checkSurgeonOwnership;