const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientController');
const verifyToken = require('../auth/verifyToken');
const isAdmin1=require("../auth/isAdmin1");

// Routes for patient CRUD operations
router.post('/', patientController.createPatient);
router.post('/login', patientController.loginPatient);

//this is for Hospital Admin
router.get('/getAllPatient/:adminId',verifyToken,isAdmin1,patientController.getAllPatients);
router.get("/getAllPatientByDepartmentId/:departmentId",verifyToken,patientController.getAllPatientsByDepartmentId);
router.get("/getAllPatientsByHospitalId/:hospitalId/:adminId",verifyToken,isAdmin1,patientController.getAllPatientsByHospitalId);
router.get("/getAllPatientByHospitalId/:hospitalId/:adminId",verifyToken,isAdmin1,patientController.getAllPatientsByHospitalId);
router.get('/getPatientById/:id',verifyToken, patientController.getPatientById);
router.put('/updatePatientById/:id',verifyToken, patientController.updatePatientById);
router.delete('/deletePatient/:id',verifyToken,patientController.deletePatientById);

module.exports = router;
