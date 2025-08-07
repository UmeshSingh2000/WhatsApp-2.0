import api from "../Utils/axios";
import { statusCodes } from "../Utils/statusCodes";

// register a new user
const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        if (response.status === statusCodes.CREATED) {
            return {
                message: response.data.message,
                user: response.data.user,
                status: response.status
            }
        }
    } catch (error) {
        throw error.response.data;
    }
}

//login user
const loginUser = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData)
        if (response.status === statusCodes.OK) {
            return {
                message: response.data.message,
                user: response.data.user,
                status: response.status
            }
        }
    } catch (error) {
        throw error.response.data;
    }
}

//check if the phone number exists or not
const checkPhoneNumberExists = async (phoneNumber) => {
    try {
        const response = await api.post('/auth/check-phone', { phoneNumber });
        if (response.status === statusCodes.OK) {
            return {
                message: response.data.message,
                status: response.status
            }
        }
    } catch (error) {
        throw error.response.data;
    }
}

const checkUserAuth = async () => {
    try {
        const response = await api.get('/check-auth')
        console.log(response)
        if (response.status === statusCodes.OK) {
            return {
                user: response.data.user,
                status: response.status
            }
        }
    } catch (error) {
        console.log("Error checking user authentication:", error);
        throw error?.response?.data || { message: 'Something went wrong while checking auth' };

    }

}




export {
    registerUser,
    checkPhoneNumberExists,
    loginUser,
    checkUserAuth
}