
const statusCodes = require('../Utils/StatusCodes');
const errorMessage = require('../Utils/errorMessages');
const { verifyToken } = require('../Utils/jwt');
const authenticateToken = (tokenType = 'access') => {
    return (req, res, next) => {
        try {
            let token;
            if (tokenType === 'access') {
                token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

            }
            else if (tokenType === 'refresh') {
                token = req.cookies.refreshToken || req.headers.authorization?.split(' ')[1];
            }
            if (!token) {
                return res.status(statusCodes.UNAUTHORIZED).json({
                    message: errorMessage.AUTH.UNAUTHORIZED_ACCESS
                })
            }
            const decoded = verifyToken(token, tokenType === 'refresh')
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage.INTERNAL_SERVER_ERROR
            });
        }
    }
}

module.exports = authenticateToken;