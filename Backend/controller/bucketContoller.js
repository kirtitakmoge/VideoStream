const { isValidObjectId } = require("mongoose");
const Camera=require("../models/Camera"); // Assuming you have a Camera model defined

const AWS = require('aws-sdk');
const ENDPOINT = new AWS.Endpoint('s3.wasabisys.com');/*
const REGION = 'us-east-1'; // Adjust the region if necessary
const ACCESS_KEY ='BSQNQEBMHJYFDGD7436X';
const SECRET_ACCESS_KEY = 'CK5beQ9OzoCMFMenVH5q7NVLDSp7hdVsbQHDVyRo';*/

// Configure AWS SDK with your credentials
const s3 = new AWS.S3({
  signatureVersion: 'v4',
    endpoint: ENDPOINT,
    accessKeyId:"MNQ3RQF2ZDUL3Z2MA5H3",
    secretAccessKey:"awn43DuahqRIBGahbGMzCwW1CSepEp9Dbe7AzIan",
    region: 'us-east-1'
    
  });exports.getBucketData = async (req, res) => {
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
  
      // Make a request to the bucket to list its objects
      const params = {
        Bucket: camera.bucketName
      };
  
      const data = await s3.listObjects(params).promise();
  
      // Extract relevant data from the response
      const objectUrls = data.Contents.map(obj => {
        const signedParams = {
          Bucket: camera.bucketName,
          Key: obj.Key,
          Expires: 3600 // URL expires in 1 hour
        };
        const url = s3.getSignedUrl('getObject', signedParams);
        return { key: obj.Key, url };
      });
  
      res.json({ objectUrls });
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
      Key: objectKey,
      
    };

    // Delete the object from the bucket
    await s3.deleteObject(params).promise();

    res.json({ message: "Object deleted successfully" });
  } catch (err) {
    console.error('Error deleting object:', err);
    res.status(500).json({ error: 'Failed to delete object' });
  }
};
exports.generateUploadUrl = async (req, res) => {
  try {
    const { cameraId, fileName } = req.body;

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

    // Generate pre-signed URL for uploading the file
    const params = {
      Bucket: camera.bucketName,
      Key: fileName, // Set the file name as the object key
      Expires: 3600 ,
      
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
 console.log(uploadUrl)
    res.status(200).json( uploadUrl );
  } catch (err) {
    console.error('Error generating upload URL:', err);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
};
// Controller function to download an object from the bucket
exports.downloadObjectFromBucket = async (req, res) => {
  try {
    const { cameraId, objectKey } = req.body;

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

    // Construct parameters for downloading the object
    const params = {
      Bucket: camera.bucketName,
      Key: objectKey
    };

    // Get the object from the bucket
    const downloadUrl = await s3.getSignedUrlPromise('getObject', params);

  
    // Stream the object data to the response
    res.status(200).json({ downloadUrl });
    
  } catch (err) {
    console.error('Error downloading object:', err);
    res.status(500).json({ error: 'Failed to download object' });
  }
};

// Controller function to rename an object in the bucket
exports.renameObjectInBucket = async (req, res) => {
  try {
    const { cameraId, objectKey, newName } = req.body;

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

    // Check if the object key and new name are provided
    if (!objectKey || !newName) {
      return res.status(400).json({ error: "Object key and new name are required" });
    }

    // Construct parameters for renaming the object
    const params = {
      Bucket: camera.bucketName,
      CopySource: `${camera.bucketName}/${objectKey}`, // Source object key
      Key: newName // New object key
    };

    // Copy the object with the new name
    await s3.copyObject(params).promise();

    // Delete the original object
    await s3.deleteObject({ Bucket: camera.bucketName, Key: objectKey }).promise();

    res.json({ message: "Object renamed successfully" });
  } catch (err) {
    console.error('Error renaming object:', err);
    res.status(500).json({ error: 'Failed to rename object' });
  }
};

