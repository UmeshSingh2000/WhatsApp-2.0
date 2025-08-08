const errorMessage = require("../Utils/errorMessages");
const statusCodes = require("../Utils/StatusCodes");
const User = require('../Database/Models/userSchema');
const { checkPassword, hashPassword } = require("../Utils/password");
const { generateToken } = require("../Utils/jwt");
const { phoneNumberValid, removeNonDigitCharacters } = require("../Utils/helpers");

const loginUser = async (req, res) => {
    try {
        let { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json({
                    error: errorMessage.VALIDATION.MISSING_FIELDS
                });
        }
        //validate Phone Number
        if (!phoneNumberValid(phoneNumber)) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json({
                    error: errorMessage.VALIDATION.INVALID_PHONE_NUMBER
                });
        }
        //remove non digits from number
        phoneNumber = removeNonDigitCharacters(phoneNumber);

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
        const token = generateToken(user._id, user.phoneNumber);
        res.cookie('accessToken', token);

        //refresh token
        const refreshToken = generateToken(user._id, user.phoneNumber, true);
        res.cookie('refreshToken', refreshToken);

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

const checkPhoneNumberExists = async (req, res) => {
    try {
        let { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json({
                    error: errorMessage.VALIDATION.MISSING_FIELDS
                });
        }
        //validate Phone Number
        if (!phoneNumberValid(phoneNumber)) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json({
                    error: errorMessage.VALIDATION.INVALID_PHONE_NUMBER
                });
        }
        //remove non digits from number
        phoneNumber = removeNonDigitCharacters(phoneNumber);

        const user = await User.exists({ phoneNumber });
        if (!user) {
            return res
                .status(statusCodes.NOT_FOUND)
                .json({
                    error: errorMessage.AUTH.USER_NOT_FOUND
                });
        }
        return res.status(statusCodes.OK).json({
            message: "User exists",
        });
    } catch (error) {
        console.log("Error checking phone number:", error);
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .json({
                error: errorMessage.SERVER.INTERNAL_SERVER_ERROR
            });
    }
}

const registerUser = async (req, res) => {
    try {
        let { phoneNumber, password, name, countryCode } = req.body;
        if (!phoneNumber || !password || !name || !countryCode) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json({
                    error: errorMessage.VALIDATION.MISSING_FIELDS
                });
        }
        // Validate phone number format

        if (!phoneNumberValid(phoneNumber)) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json({
                    error: errorMessage.VALIDATION.INVALID_PHONE_NUMBER
                });
        }

        phoneNumber = removeNonDigitCharacters(phoneNumber);

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

        //generate cookie to automatically login
        //generate JWT token
        const token = generateToken(newUser._id, newUser.phoneNumber);
        res.cookie('accessToken', token);

        //refresh token
        const refreshToken = generateToken(newUser._id, newUser.phoneNumber, true);
        res.cookie('refreshToken', refreshToken);

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

const refreshToken = (req, res) => {
    try {
        const { id, phoneNumber } = req.user
        const token = generateToken(id, phoneNumber)
        res.cookie('accessToken', token)
        res.status(200).json({ message: "Access token refreshed" });
    } catch (error) {
        console.error(error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage.SERVER.INTERNAL_SERVER_ERROR });
    }
}


module.exports = {
    loginUser,
    registerUser,
    checkPhoneNumberExists,
    refreshToken
};