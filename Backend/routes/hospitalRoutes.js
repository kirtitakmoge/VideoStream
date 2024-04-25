const express = require('express');
const router = express.Router();
const hospitalController = require('../controller/hospitalController');
const requireSuperAdmin = require('../auth/requireSuperAdmin');
const verifyToken = require('../auth/verifyToken');
const isAdmin1=require("../auth/isAdmin1");
//router.post('/createHospital/:superAdminId',verifyToken,requireSuperAdmin, hospitalController.createHospital);


//this for register surgeon  accessible to all
router.get('/getAllHospitalNames', hospitalController.getAllHospitalNames);


router.get('/getAllHospitals',hospitalController.getAllHospitals);
router.get('/getHospitalById/:adminId/:hospitalId',verifyToken,isAdmin1, hospitalController.getHospitalById);
//router.put('/updateHospitalById/:hospitalId',hospitalController.updateHospital);
//router.delete('/deleteHospital/:hospitalId', hospitalController.deleteHospital);
router.post('/createHospital', hospitalController.createHospital);

//this all routes of superAdmin
// create delete and update Hospital can only be done by SuperAdmin only
router.get('/getHospitalById/:superAdminId/:hospitalId',verifyToken,requireSuperAdmin, hospitalController.getHospitalById);
router.post('/createHospital/:superAdminId',verifyToken,requireSuperAdmin, hospitalController.createHospital);
router.get("/getAllHospitals/:superAdminId",verifyToken,requireSuperAdmin,hospitalController.getAllHospitals)//this for super admin to get sll hospital
router.delete("/deleteHospital/:superAdminId/:hospitalId",requireSuperAdmin,hospitalController.deleteHospitalById)//this for super admin to delete hospital
router.put('/updateHospitalById/:superAdminId/:hospitalId',verifyToken,requireSuperAdmin,hospitalController.updateHospitalById);//super admin update hospital detail
module.exports = router;
