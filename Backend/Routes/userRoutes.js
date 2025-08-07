const express = require('express');
const router = express.Router();
const { loginUser, registerUser, checkPhoneNumberExists } = require('../Controller/userController');
// const limiter = require('../Middleware/rateLimiter');

router.post('/login',  loginUser);
router.post('/check-phone', checkPhoneNumberExists);
router.post('/register',  registerUser);

module.exports = router;