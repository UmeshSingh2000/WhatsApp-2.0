const express = require('express');
const router = express.Router();
const { loginUser } = require('../Controller/userController');
const limiter = require('../Middleware/rateLimiter');

router.post('/login', limiter(1 * 60 * 1000, 5), loginUser);

module.exports = router;