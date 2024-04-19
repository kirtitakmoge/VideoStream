const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Routes that do not require authentication
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);

module.exports = router;
