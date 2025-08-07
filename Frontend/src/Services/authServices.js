import api from "../Utils/axios";
import { statusCodes } from "../Utils/statusCodes";

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

const loginUser = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData)
        if(response.status === statusCodes.OK){
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

export {
    registerUser
}