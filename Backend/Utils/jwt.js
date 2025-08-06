const jwt = require('jsonwebtoken');


const generateToken = (userId, isRefreshToken = false) => {
    try {
        const secret = isRefreshToken
            ? process.env.REFRESH_TOKEN_SECRET
            : process.env.JWT_SECRET;

        const payload = { id: userId };

        const options = { expiresIn: isRefreshToken ? '7d' : '1d' };

        return jwt.sign(payload, secret, options);
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Internal server error");
    }
}


const verifyToken = (token, isRefreshToken = false) => {
    try {
        const secret = isRefreshToken
            ? process.env.REFRESH_TOKEN_SECRET
            : process.env.JWT_SECRET;
            
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
};
