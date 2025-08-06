const { rateLimit } = require('express-rate-limit');
const statusCodes = require('../Utils/StatusCodes');
const limiter = (time = 15 * 60 * 1000, noOfRequests = 300) => {
    return rateLimit({
        windowMs: time,
        max: noOfRequests,
        handler: (req, res) => {
            return res.status(statusCodes.TOO_MANY_REQUESTS).json({
                error: "Too many requests",
                message: "Too many requests from this IP, please try again later."
            })
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
}

module.exports = limiter