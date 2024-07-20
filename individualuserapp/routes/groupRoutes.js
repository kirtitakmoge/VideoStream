const express = require('express');
const router = express.Router();
const groupController = require('../controller/groupController');

// Route for creating a group
router.post('/create', groupController.createGroup);

// Route for adding a member to a group
router.post('/add-member/:groupId', groupController.addMemberToGroup);
router.get("/getAllUserByGroupId/:groupId",groupController.getAllUsersOfGroup);
router.delete("/removeUserFromGroup/:groupId/:userId",groupController.removeUserFromGroup);



module.exports = router;
