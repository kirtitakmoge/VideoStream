const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const adminController = require('../controller/adminController');

const verifyToken = require('../auth/verifyToken');
const requireSuperAdmin = require('../auth/requireSuperAdmin');
const isAdmin = require('../auth/adminAuthforvideo');


//public routes
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.post('/verifyOtp',userController.verifyOtp);
router.post("/resendOtp",userController.resendOTP);
router.post('/request-password-reset',userController.requestPasswordReset);
router.post('/reset-password', userController.resetPassword);

//for all role
router.get("/getUserById/:surgeonId",verifyToken,userController.getUserByID);

//routes for HospitalAdmin
router.post("/admin/getAllUsers/:adminId",verifyToken,isAdmin,adminController.getAllUsers);
router.get("/admin/all-User",isAdmin,userController.getAllUser);
router.get('/getSurgeonsByHospitalId/:hospitalId', userController.getSurgeonsByHospitalId);
router.get("/getCamerasForUser/:surgeonId",userController.getCamerasForUser);


//routes for Suregeon
//router.get("/getUserbyId/:surgeonId",verifyToken,checkSurgeonOwnershipdata,userController.getUserByID);
router.delete("/deleteUserById/:surgeonId",verifyToken,userController.deleteUserById);
//router.put("/updateUserById/:surgeonId",verifyToken,checkSurgeonOwnershipdata,userController.updateUserById);
router.put("/updateUserById/:surgeonId",verifyToken,userController.updateUserById);

router.get("/getCameraUrlByUserId/:surgeonId",userController.getCameraUrlByUserId);




//routes for super Admin
router.put("/super/updateRoleById/:superAdminId/:surgeonId",verifyToken,requireSuperAdmin,userController.updateRole);
router.get("/super/all-User",requireSuperAdmin,userController.getAllUser);
router.get("/getUsersByDepartmentId/:departmentId",userController.getUsersByDepartmentId);
router.put('/updateUserActiveStatus/:id/activate',verifyToken, userController.updateUserActiveStatus);
router.get("/getHospitalAdminByHospitalId/:hospitalId/:superAdminId",verifyToken,requireSuperAdmin,userController.getHospitalAdminByHospitalId);
router.put("/updateHospitalAdminActiveStatus/:adminId/:superAdminId/activate",verifyToken,requireSuperAdmin,userController.updateHospitalAdminActiveStatus);
module.exports = router;
