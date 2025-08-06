const bcrypt = require('bcrypt');
const checkPassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error checking password:", error);
        throw new Error("Internal server error");
    }
}
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Internal server error");
    }
}

module.exports = {
    checkPassword,
    hashPassword
};