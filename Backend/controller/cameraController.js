const Camera=require("../models/Camera");
const { isValidObjectId } = require('mongoose');
exports.createCamera = async (req, res) => {
    try {
        // Create a new camera instance with the request body
        const camera = new Camera(req.body);
        
        // Attempt to save the camera document
        const savedCamera = await camera.save();
        
        // Return the saved camera in the response
        return res.status(201).json({ savedCamera });
    } catch (error) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            // Validation error occurred, return a 400 Bad Request response
            return res.status(400).json({ error: error.message });
        }
        // For other types of errors, return a 500 Internal Server Error response
        console.error('Error creating Camera:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAllCameras = async (req, res) => 
{
    try {
        const cameras = await Camera.find();
        if (cameras && cameras.length > 0) {
            return res.status(200).json(cameras);
        } else {
            return res.status(404).json({ error: "No Cameras found" });
        }
    } catch (error) {
        console.error("Error in getAllCameras:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getCameraById = async (req, res) => {
    const cameraId = req.params.cameraId;

    // Check if the provided ID is a valid ObjectId
    if (!isValidObjectId(cameraId)) {
        return res.status(400).json({ error: "Invalid Id" });
    }

    try {
        const camera = await Camera.findById(cameraId);

        // Check if camera is found
        if (camera) {
            return res.status(200).json(camera);
        } else {
            return res.status(404).json({ error: "Camera not found" });
        }
    } catch (error) {
        console.error("Error in getCameraById:", error);

        // Handle different types of errors
        if (error.name === 'CastError') {
            // If invalid ID format
            return res.status(400).json({ error: "Invalid Id" });
        } else {
            // For other types of errors (e.g., database errors)
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

exports.updateCameraById = async (req, res) => {
    const cameraId = req.params.cameraId;
    const updatedCamera = req.body;

    // Check if the provided ID is a valid ObjectId
    if (!isValidObjectId(cameraId)) {
        return res.status(400).json({ error: "Invalid Id" });
    }

    try {
        // Check if the request body is empty
        if (Object.keys(updatedCamera).length === 0) {
            return res.status(400).json({ error: "Request body cannot be empty" });
        }

        const camera = await Camera.findByIdAndUpdate(cameraId, updatedCamera, { new: true });

        // Check if camera is found
        if (camera) {
            return res.status(200).json(camera);
        } else {
            return res.status(404).json({ error: "Camera not found" });
        }
    } catch (error) {
        console.error("Error in updateCameraById:", error);

        // Handle different types of errors
        if (error.name === 'CastError') {
            // If invalid ID format
            return res.status(400).json({ error: "Invalid Id" });
        } else {
            // For other types of errors (e.g., database errors)
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}


exports.deleteCameraById = async (req, res) => {
    const cameraId = req.params.Id;

    // Check if the provided ID is a valid ObjectId
    if (!isValidObjectId(cameraId)) {
        return res.status(400).json({ error: "Invalid Id" });
    }

    try {
        const camera = await Camera.findByIdAndDelete(cameraId);

        // Check if camera is found and deleted
        if (camera) {
            return res.status(200).json({ message: "Camera Deleted Successfully" });
        } else {
            return res.status(404).json({ error: "Camera not found" });
        }
    } catch (error) {
        console.error("Error in deleteCameraById:", error);

        // Handle different types of errors
        if (error.name === 'CastError') {
            // If invalid ID format
            return res.status(400).json({ error: "Invalid Id" });
        } else {
            // For other types of errors (e.g., database errors)
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

exports.getCamerasByDepartmentId = async (req, res) => {
    try {
      const { departmentId } = req.params;
      // Assuming you have a Camera model and a Department model
      const cameras = await Camera.find({ departmentId: departmentId }).populate('departmentId');
      
      res.json(cameras);
    } catch (error) {
      console.error('Error fetching cameras by department ID:', error);
      res.status(500).json({ error: 'An error occurred while fetching cameras' });
    }
  };