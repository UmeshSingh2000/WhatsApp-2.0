const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../Controller/userController');
const limiter = require('../Middleware/rateLimiter');

router.post('/login', limiter(15 * 60 * 1000, 5), loginUser);
router.post('/register', limiter(15 * 60 * 1000, 5), registerUser);

module.exports = router;