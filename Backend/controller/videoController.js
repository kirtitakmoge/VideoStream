const { isValidObjectId } = require('mongoose');
const Video = require('../models/Video');

// Helper function to handle validation errors
const handleValidationError = (error, res) => {
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ errors });
    }
    console.error('Validation error:', error);
    res.status(500).json({ error: 'Internal server error' });
};

// Controller function to upload a new video
exports.uploadVideo = async (req, res) => {
    try {
        const newVideo = new Video(req.body);
        const savedVideo = await newVideo.save();
        return res.status(201).json(savedVideo);
    } catch (error) {
        handleValidationError(error, res);
    }
};

// Controller function to get a list of all videos
exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        return res.status(200).json(videos);
    } catch (error) {
        console.error('Error getting videos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get all videos for a surgeon
exports.getVideosForSurgeon = async (req, res) => {
    try {
        const surgeonId = req.params.surgeonId;
        if (!isValidObjectId(surgeonId)) {
            return res.status(400).json({ error: 'Invalid surgeon ID' });
        }
        const videos = await Video.find({ userID: surgeonId });
        res.status(200).json(videos);
    } catch (error) {
        handleValidationError(error, res);
    }
};

// Controller function to get all videos by hospital ID
exports.getVideosByHospitalId = async (req, res) => {
    try {
        const hospitalId = req.params.hospitalId;
        if (!isValidObjectId(hospitalId)) {
            return res.status(400).json({ error: 'Invalid hospital ID' });
        }
        const videos = await Video.find({ hospitalID: hospitalId });
        res.status(200).json(videos);
    } catch (error) {
        handleValidationError(error, res);
    }
};

// Controller function to get details of a specific video by ID
exports.getVideoById = async (req, res) => {
    try {
        const videoId = req.params.videoId;
        if (!isValidObjectId(videoId)) {
            return res.status(400).json({ error: 'Invalid video ID' });
        }
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        console.error('Error getting video by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to update details of a specific video by ID
exports.updateVideoById = async (req, res) => {
    try {
        const videoId = req.params.videoId;
        if (!isValidObjectId(videoId)) {
            return res.status(400).json({ error: 'Invalid video ID' });
        }
        const updatedVideo = await Video.findByIdAndUpdate(videoId, req.body, { new: true });
        if (!updatedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.status(200).json(updatedVideo);
    } catch (error) {
        handleValidationError(error, res);
    }
};

// Controller function to delete a specific video by ID
exports.deleteVideoById = async (req, res) => {
    try {
        const videoId = req.params.videoId;
        if (!isValidObjectId(videoId)) {
            return res.status(400).json({ error: 'Invalid video ID' });
        }
        const deletedVideo = await Video.findByIdAndDelete(videoId);
        if (!deletedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.status(204).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Error deleting video by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
