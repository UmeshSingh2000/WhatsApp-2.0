const errorMessage = require("../Utils/errorMessages");
const statusCodes = require("../Utils/StatusCodes");
const User = require('../Database/Models/userSchema');
const { checkPassword, hashPassword } = require("../Utils/password");
const { generateAccessToken } = require("../Utils/JWT");

const loginUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json({
                    error: errorMessage.VALIDATION.MISSING_FIELDS
                });
        }

        //check if user exists
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res
                .status(statusCodes.NOT_FOUND)
                .json({
                    error: errorMessage.AUTH.USER_NOT_FOUND
                });
        }

        // check password
        const isPasswordValid = await checkPassword(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(statusCodes.UNAUTHORIZED)
                .json({
                    error: errorMessage.AUTH.INVALID_CREDENTIALS
                });
        }
        // if everything is fine, return user data
        const { password: pass, __v, ...userData } = user.toObject();
        
        //generate JWT token
        const token = generateAccessToken(user._id);
        res.cookie('accessToken' , token);
        
        return res.status(statusCodes.OK).json({
            message: "Login successful",
            user: userData
        })
    } catch (error) {
        console.error("Error logging in user:", error);
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .json({
                error: errorMessage.SERVER.INTERNAL_SERVER_ERROR
            });
    }
}

const registerUser = async (req, res) => {
    try {
        const { phoneNumber, password, name, countryCode } = req.body;
        if (!phoneNumber || !password || !name || !countryCode) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json({
                    error: errorMessage.VALIDATION.MISSING_FIELDS
                });
        }
        // check if user already exists
        const existingUser = await User.findOne({
            phoneNumber
        })
        if (existingUser) {
            return res
                .status(statusCodes.CONFLICT)
                .json({
                    error: errorMessage.AUTH.USER_ALREADY_EXISTS
                });
        }
        // create new user
        const newUser = new User({
            name,
            phoneNumber,
            password: await hashPassword(password),
            countryCode
        })
        await newUser.save();
        const { password: pass, __v, ...userData } = newUser.toObject();
        return res.status(statusCodes.CREATED).json({
            message: "User registered successfully",
            user: userData
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .json({
                error: errorMessage.SERVER.INTERNAL_SERVER_ERROR
            });

    }
}
module.exports = {
    loginUser,
    registerUser
};