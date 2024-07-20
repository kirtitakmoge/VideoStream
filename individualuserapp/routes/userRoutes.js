const express = require('express');
const { registerUser, loginUser, getUserById, updateUserById, deleteUserById} = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authMiddleware, getUserById);
router.patch('/:id', authMiddleware, updateUserById);
router.delete('/:id', authMiddleware, deleteUserById);

module.exports = router;
