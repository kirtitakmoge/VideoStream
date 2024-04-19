const express = require('express');
const router = express.Router();

const subscriptionPlanController = require('../controller/subscriptionPlanController');
const requireSuperAdmin = require('../auth/requireSuperAdmin');

router.post("/createPlan/:superAdminId",requireSuperAdmin,subscriptionPlanController.createPlan);
router.get("/getPlanById/:superAdminId/:planId",requireSuperAdmin,subscriptionPlanController.getPlanById);
router.get("/getAllPlans/:superAdminId",requireSuperAdmin,subscriptionPlanController.getAllPlans);
router.put("/updatePlanById/:superAdminId/:planId",requireSuperAdmin,subscriptionPlanController.updatePlanById);
router.delete("/deletePlanById/:superAdminId/:planId",requireSuperAdmin,subscriptionPlanController.deletePlanById);
router.post("/createPlan",subscriptionPlanController.createPlan);
router.get("/getAllPlans",subscriptionPlanController.getAllPlans);
router.get("/getPlanById/:planId",subscriptionPlanController.getPlanById);
module.exports = router;