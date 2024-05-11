const express=require("express");
const router=express.Router();
const requireSuperAdmin=require("../auth/requireSuperAdmin");
const verifyToken=require("../auth/verifyToken");
const cameraController=require("../controller/cameraController");
router.post("/createCamera",cameraController.createCamera);
router.get("/getAllCameras/:superAdminId",verifyToken,requireSuperAdmin,cameraController.getAllCameras);
router.get("/getCameraById/:cameraId",verifyToken,cameraController.getCameraById);
router.put("/updateCameraById/:cameraId",verifyToken,cameraController.updateCameraById);
router.delete("/deleteCameraById/:cameraId",verifyToken,cameraController.deleteCameraById);
router.get('/getCamerasByDepartmentId/:departmentId',verifyToken, cameraController.getCamerasByDepartmentId);

module.exports=router;