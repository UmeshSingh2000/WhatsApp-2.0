const express = require('express');
const router = express.Router();
const { loginUser, registerUser, checkPhoneNumberExists, refreshToken } = require('../Controller/userController');
const authenticateToken = require('../Middleware/authenticateToken');
// const limiter = require('../Middleware/rateLimiter');

router.post('/login', loginUser);
router.post('/check-phone', checkPhoneNumberExists);
router.post('/register', registerUser);
router.post('/refresh', authenticateToken('refresh'), refreshToken);

module.exports = router;