const { isValidObjectId } = require("mongoose");
const Camera=require("../models/Camera"); // Assuming you have a Camera model defined

const AWS = require('aws-sdk');
const ENDPOINT = new AWS.Endpoint('s3.wasabisys.com');/*
const REGION = 'us-east-1'; // Adjust the region if necessary
const ACCESS_KEY ='BSQNQEBMHJYFDGD7436X';
const SECRET_ACCESS_KEY = 'CK5beQ9OzoCMFMenVH5q7NVLDSp7hdVsbQHDVyRo';*/

// Configure AWS SDK with your credentials
const s3 = new AWS.S3({
    endpoint: ENDPOINT,
  accessKeyId:"",
  secretAccessKey:"",
  region: ""
  
});
// Controller function
exports.getBucketData = async (req, res) => {
    try {
      const cameraId = req.params.cameraId;
  
      // Check if the provided ID is a valid ObjectId
      if (!isValidObjectId(cameraId)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
  
      // Find the camera by ID
      const camera = await Camera.findById(cameraId);
  
      // Check if the camera exists
      if (!camera) {
        return res.status(404).json({ error: "Camera not found" });
      }
  
      // Make a request to the Wasabi bucket to list its objects
      const params = {
        Bucket: camera.bucketName
      };
      console.log(camera.bucketName);
      const data = await s3.listObjects(params).promise();
      
      // Extract relevant data from the response
      const bucketData = data.Contents.map(obj => ({
        Key: obj.Key,
        LastModified: obj.LastModified
        // Add more properties as needed
      }));
  
      // Separate photos and videos
      const photoUrls = [];
      const videoUrls = [];
  
      console.log(bucketData);
      // Generate pre-signed URLs for all objects and categorize them as photo or video
      for (const obj of bucketData) {
        const signedParams = {
          Bucket: camera.bucketName,
          Key: obj.Key,
          Expires: 3600 // URL expires in 1 hour
        };
        const url = await s3.getSignedUrlPromise('getObject', signedParams);
        // Check if the object is a photo or video (you may need to adjust this condition based on your file naming conventions)
        if (obj.Key.endsWith(".jpg") || obj.Key.endsWith(".jpeg") || obj.Key.endsWith(".png")) {
          photoUrls.push({ key: obj.Key, url });
        } else if (obj.Key.endsWith(".mp4") || obj.Key.endsWith(".avi") || obj.Key.endsWith(".mov")||obj.Key.endsWith(".ts")) {
          videoUrls.push({ key: obj.Key, url });
        }
      }
  
      // Send the photo and video URLs separately to the browser
      res.json({ photoUrls, videoUrls });
    } catch (err) {
      console.error('Error retrieving bucket data:', err);
      res.status(500).json({ error: 'Failed to retrieve bucket data' });
    }
  };
  

  
// Controller function to delete an object from the bucket
exports.deleteObjectFromBucket = async (req, res) => {
  try {
    const { cameraId, objectKey } = req.body;
   console.log(cameraId,objectKey);
    // Check if the provided camera ID is a valid ObjectId
    if (!isValidObjectId(cameraId)) {
      return res.status(400).json({ error: "Invalid camera ID" });
    }

    // Find the camera by ID
    const camera = await Camera.findById(cameraId);

    // Check if the camera exists
    if (!camera) {
      return res.status(404).json({ error: "Camera not found" });
    }

    // Check if the object key is provided
    if (!objectKey) {
      return res.status(400).json({ error: "Object key is required" });
    }

    // Construct parameters for deleting the object
    const params = {
      Bucket: camera.bucketName,
      Key: objectKey
    };

    // Delete the object from the bucket
    await s3.deleteObject(params).promise();

    res.json({ message: "Object deleted successfully" });
  } catch (err) {
    console.error('Error deleting object:', err);
    res.status(500).json({ error: 'Failed to delete object' });
  }
};