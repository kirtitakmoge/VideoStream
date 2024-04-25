// routes/bucketRoutes.js

const express = require('express');
const router = express.Router();
const bucketController = require('../controller/bucketContoller');
const verifyToken = require('../auth/verifyToken');
const isAdmin1 = require('../auth/isAdmin1');
const a=require("../models/UserSubscription");
// Define routes surgeon and Hospital Admin
router.get('/device/getObjectFromBucket/:cameraId',verifyToken, bucketController.getBucketData);

//For Only Hospital Admin
router.delete("/device/deleteObjectFromBucket/:adminId",verifyToken,isAdmin1,bucketController.deleteObjectFromBucket);
module.exports = router;
