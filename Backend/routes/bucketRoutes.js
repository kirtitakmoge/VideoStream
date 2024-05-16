// routes/bucketRoutes.js

const express = require('express');
const router = express.Router();
const bucketController = require('../controller/bucketContoller');
const verifyToken = require('../auth/verifyToken');
const isAdmin1 = require('../auth/isAdmin1');
const a=require("../models/UserSubscription");
const requireSuperAdmin=require("../auth/requireSuperAdmin");
// Define routes surgeon and Hospital Admin
router.get('/device/getObjectFromBucket/:cameraId',verifyToken, bucketController.getBucketData);
router.put("/device/renameObjectInBucket/:adminId",verifyToken,isAdmin1,bucketController.renameObjectInBucket);
router.post("/device/downloadObjectFromBucket/:adminId",verifyToken,isAdmin1,bucketController.downloadObjectFromBucket);
//For Only Hospital Admin
router.delete("/device/deleteObjectFromBucket/:adminId",verifyToken,isAdmin1,bucketController.deleteObjectFromBucket);
router.post("/device/generateUploadUrl/:adminId",verifyToken,isAdmin1,bucketController.generateUploadUrl);
router.put("/device/superAdmin/renameObjectInBucket/:superAdminId",verifyToken,requireSuperAdmin,bucketController.renameObjectInBucket);
router.post("/device/superAdmin/downloadObjectFromBucket/:superAdminId",verifyToken,requireSuperAdmin,bucketController.downloadObjectFromBucket);
//For Only Hospital Admin
router.delete("/device/superAdmin/deleteObjectFromBucket/:superAdminId",verifyToken,requireSuperAdmin,bucketController.deleteObjectFromBucket);
router.post("/device/superAdmin/generateUploadUrl/:superAdminId",verifyToken,requireSuperAdmin,bucketController.generateUploadUrl);
module.exports = router;
