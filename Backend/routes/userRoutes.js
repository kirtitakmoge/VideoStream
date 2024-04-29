const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const generateToken = require('../auth/generateToken');
const checkSurgeonOwnership=require("../auth/checkSurgeonOwnership");
const adminController = require('../controller/adminController');
//const role =require("../auth/checkHospitalAdminAuthorization");
const verifyToken = require('../auth/verifyToken');
const requireSuperAdmin = require('../auth/requireSuperAdmin');
const isAdmin = require('../auth/adminAuthforvideo');
const checkSurgeonOwnershipdata=require("../auth/checkSurgeonOwnershipdata");

//public routes
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);

//routes for admin
router.post("/admin/getAllUsers/:adminId",verifyToken,isAdmin,adminController.getAllUsers);
router.get("/admin/all-User",isAdmin,userController.getAllUser);
router.get('/getSurgeonsByHospitalId/:hospitalId', userController.getSurgeonsByHospitalId);
router.get("/getCamerasForUser/:surgeonId",userController.getCamerasForUser);

//routes for Suregeon
//router.get("/getUserbyId/:surgeonId",verifyToken,checkSurgeonOwnershipdata,userController.getUserByID);
router.delete("/deleteUserById/:surgeonId",verifyToken,userController.deleteUserById);
//router.put("/updateUserById/:surgeonId",verifyToken,checkSurgeonOwnershipdata,userController.updateUserById);
router.put("/updateUserById/:surgeonId",userController.updateUserById);
router.get("/getUserById/:surgeonId",verifyToken,userController.getUserByID);
router.get("/getCameraUrlByUserId/:surgeonId",userController.getCameraUrlByUserId);
//routes for super Admin
router.put("/super/updateRoleById/:superAdminId/:surgeonId",verifyToken,requireSuperAdmin,userController.updateRole);
router.get("/super/all-User",requireSuperAdmin,userController.getAllUser);
router.get("/getUsersByDepartmentId/:departmentId",userController.getUsersByDepartmentId);
router.put('/updateUserActiveStatus/:id/activate',verifyToken, userController.updateUserActiveStatus);
router.get("/getHospitalAdminByHospitalId/:hospitalId/:superAdminId",verifyToken,requireSuperAdmin,userController.getHospitalAdminByHospitalId);
router.put("/updateHospitalAdminActiveStatus/:adminId/:superAdminId/activate",verifyToken,requireSuperAdmin,userController.updateHospitalAdminActiveStatus);
module.exports = router;
