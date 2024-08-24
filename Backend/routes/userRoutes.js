const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const adminController = require('../controller/adminController');
const upload=require("../auth/multerConfig");
const isAdmin1=require("../auth/isAdmin1");
const verifyToken = require('../auth/verifyToken');
const requireSuperAdmin = require('../auth/requireSuperAdmin');
const isAdmin = require('../auth/adminAuthforvideo');
router.get("/allSurgeon",userController.getAllUser);

//public routes
router.post('/signup/Surgeon', userController.signupUser);
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
router.get('/getSurgeonsByHospitalId/:hospitalId/:adminId',isAdmin1, userController.getSurgeonsByHospitalId);
router.get("/getCamerasForUser/:surgeonId",userController.getCamerasForUser);


//routes for Suregeon
//router.get("/getUserbyId/:surgeonId",verifyToken,checkSurgeonOwnershipdata,userController.getUserByID);
router.delete("/deleteUserById/:surgeonId",verifyToken,userController.deleteUserById);
//router.put("/updateUserById/:surgeonId",verifyToken,checkSurgeonOwnershipdata,userController.updateUserById);
router.put("/updateUserById/:surgeonId",verifyToken,userController.updateUserById);

router.get("/getCameraUrlByUserId/:surgeonId",userController.getCameraUrlByUserId);




//routes for super Admin
router.put("/super/updateRoleById/:superAdminId/:surgeonId",verifyToken,requireSuperAdmin,userController.updateRole);
router.post("/addDepartment/:adminId/:surgeonId",verifyToken,isAdmin1,userController.addDepartment);
router.post("/updateDepartment/:adminId/:surgeonId",verifyToken,isAdmin1,userController.updateDepartment);
router.get("/super/all-User",requireSuperAdmin,userController.getAllUser);
router.get("/getUsersByDepartmentId/:departmentId",userController.getUsersByDepartmentId);
router.put('/updateUserActiveStatus/:id/activate',verifyToken, userController.updateUserActiveStatus);
router.get("/getHospitalAdminByHospitalId/:hospitalId/:superAdminId",verifyToken,requireSuperAdmin,userController.getHospitalAdminByHospitalId);
router.put("/updateHospitalAdminActiveStatus/:adminId/:superAdminId/activate",verifyToken,requireSuperAdmin,userController.updateHospitalAdminActiveStatus);
module.exports = router;
