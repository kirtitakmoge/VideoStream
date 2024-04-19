const express = require('express');
const router = express.Router();
const departmentController=require("../controller/departmentController");
const verifyToken=require("../auth/verifyToken");
const isAdmin1=require("../auth/isAdmin1");
// Department routes
router.get('/getAllDepartments',departmentController.getAllDepartments);
router.get('/getDepartmentById/:departmentId', departmentController.getDepartmentById);
router.post('/createDepartment', departmentController.createDepartment);
router.patch('/updateDepartmentById/:departmentId', departmentController.updateDepartmentById);
router.delete('/deleteDepartmentById/:departmentId', departmentController.deleteDepartmentById);






//

//hospital Admin to get all department from given hospitalId(checked)
router.get('/getAllDepartmentsByHospitalId/:hospitalId/:adminId',verifyToken,isAdmin1,departmentController.getAllDepartmentsByHospitalId);
module.exports = router;
