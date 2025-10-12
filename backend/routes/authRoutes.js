const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { userValidation, validate } = require('../middleware/validator');

// Public routes
router.post('/register', userValidation.register, validate, authController.register);
router.post('/login', userValidation.login, validate, authController.login);

// Protected routes
router.get('/me', protect, authController.getMe);
router.put('/update-password', protect, authController.updatePassword);
router.post('/logout', protect, authController.logout);

module.exports = router;

