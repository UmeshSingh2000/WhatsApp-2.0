const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const generateAccessToken = (userId) => {
    try {
        const payload = { id: userId };
        const options = { expiresIn: '1d' };
        return jwt.sign(payload, secret, options);
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Internal server error");
    }
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateAccessToken,
    verifyToken
};
