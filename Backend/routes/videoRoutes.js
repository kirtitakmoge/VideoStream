const express = require('express');
const router = express.Router();
const videoController = require('../controller/videoController');
const requireSuperAdmin = require('../auth/requireSuperAdmin');
const adminAuthforvideo = require("../auth/adminAuthforvideo");
const checkHospitalAdminAuthorization = require('../auth/checkHospitalAdminAuthorization');
const isAdmin1 = require('../auth/isAdmin1');
const checkSurgeonOwnership = require('../auth/checkSurgeonOwnership');
const verifyToken = require('../auth/verifyToken');
const { verify } = require('jsonwebtoken');

 
// routes for surgeon
router.post('/surgeon/upload',verifyToken, videoController.uploadVideo);
router.get('/surgeon/getAllVideos/:surgeonId',verifyToken, videoController.getVideosForSurgeon);
router.get('/surgeon/getVideoById/:surgeonId/:videoId',verifyToken,checkSurgeonOwnership, videoController.getVideoById);
router.put('/surgeon/updateVideoById/:surgeonId/:videoId',verifyToken,checkSurgeonOwnership, videoController.updateVideoById);
router.delete('/surgeon/deleteVideoById/:surgeonId/:videoId', videoController.deleteVideoById);

//routes for Super Admin
router.get('/superadmin/getVideoById/:superAdminId/:videoId',verifyToken,requireSuperAdmin, videoController.getVideoById);
router.get('/superadmin/getAllVideos/:superAdminId',verifyToken,requireSuperAdmin, videoController.getVideos);


//routes for Hospital Admin
router.get('/admin/getVideoById/:adminId/:videoId',verifyToken,isAdmin1,adminAuthforvideo, videoController.getVideoById);
router.get('/admin/getAllVideos/:adminId/:hospitalId',verifyToken,isAdmin1,checkHospitalAdminAuthorization, videoController.getVideosByHospitalId);
module.exports = router;
