const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// @route   POST /api/auth/signup
router.post('/signup', authController.signup);

// @route   POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;