const express=require("express");
const router=express.Router();
const cameraController=require("../controller/cameraController");
router.post("/createCamera",cameraController.createCamera);
router.get("/getAllCameras",cameraController.getAllCameras);
router.get("/getCameraById/:cameraId",cameraController.getCameraById);
router.put("/updateCameraById/:cameraId",cameraController.updateCameraById);
router.delete("/deleteCameraById/:cameraId",cameraController.deleteCameraById);
router.get('/getCamerasByDepartmentId/:departmentId', cameraController.getCamerasByDepartmentId);

module.exports=router;