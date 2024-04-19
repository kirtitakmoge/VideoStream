
const AWS = require('aws-sdk');
const ENDPOINT = new AWS.Endpoint('s3.wasabisys.com');
const REGION = 'us-east-1'; // Adjust the region if necessary
const ACCESS_KEY ='BSQNQEBMHJYFDGD7436X';
const SECRET_ACCESS_KEY = 'CK5beQ9OzoCMFMenVH5q7NVLDSp7hdVsbQHDVyRo';

// Configure AWS SDK with your credentials
const s3 = new AWS.S3({
    endpoint: ENDPOINT,
  accessKeyId: ACCESS_KEY,
  secretAccessKey:SECRET_ACCESS_KEY,
  region: REGION
  
});


// Function to generate a pre-signed URL for an object
const generatePresignedUrl = async (url) => {
  try {
    // Extract the URL from the request body
  console.log(url);

    // Extract bucket name and object key from the URL
    const { bucketName, objectKey } = extractBucketAndKey(url);
    
    // Generate the pre-signed URL
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 3600, // URL expiration time in seconds (e.g., 1 hour)
    };

    const signedUrl = await s3.getSignedUrlPromise('getObject', params);
    const d={objectKey,signedUrl};
console.log("new",signedUrl);
    // Return the pre-signed URL in the response
   return d;
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return null;
  }
};

// Function to extract bucket name and object key from URL
const extractBucketAndKey = (url) => {
  try {
    const urlParts = new URL(url);
    const hostnameParts = urlParts.hostname.split('.');
    const bucketName = hostnameParts[0];
    const objectKey = urlParts.pathname.substring(1);
    return { bucketName, objectKey };
  } catch (error) {
    console.error('Error extracting bucket name and object key:', error);
    throw new Error('Invalid URL format');
  }
};

module.exports = generatePresignedUrl ;
