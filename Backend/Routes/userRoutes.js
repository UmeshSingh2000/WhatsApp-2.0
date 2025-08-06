const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../Controller/userController');
const limiter = require('../Middleware/rateLimiter');

router.post('/login',  loginUser);
router.post('/register',  registerUser);

module.exports = router;