const express = require('express');
const router = express.Router();

const userSubscriptionController = require('../controller/userSubscriptionController');

router.post("/createSubscription/:userId", userSubscriptionController.createSubscription);
router.get("/getSubscriptionById/:subscriptionId", userSubscriptionController.getSubscriptionById);
router.get("/getAllSubscriptions", userSubscriptionController.getAllSubscriptions);
router.put("/updateSubscriptionById/:subscriptionId", userSubscriptionController.updateSubscriptionById);
router.delete("/deleteSubscriptionById/:subscriptionId", userSubscriptionController.deleteSubscriptionById);

module.exports = router;
