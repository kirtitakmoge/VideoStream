// routes/bucketRoutes.js

const express = require('express');
const router = express.Router();
const bucketController = require('../controller/bucketContoller');

// Define routes
router.get('/device/:cameraId', bucketController.getBucketData);
router.delete("/device/deleteObjectFromBucket/",bucketController.deleteObjectFromBucket);
module.exports = router;
