const Message = require('../Database/Models/processed_messages');
const errorMessage = require('../Utils/errorMessages');
const statusCodes = require('../Utils/StatusCodes');


const fetchMyChats = async (req, res) => {
    try {
        // const { phoneNumber } = req.user;
        const phoneNumber = 918329446654;
        if (!phoneNumber) {
            return res
                .status(statusCodes.UNAUTHORIZED)
                .json({
                    error: errorMessage.AUTH.UNAUTHORIZED_ACCESS
                });
        }
        const chats = await Message.find({ $or: [{ from: phoneNumber }, { to: phoneNumber }] }).sort({ createdAt: -1 });
        return res.status(statusCodes.OK).json({
            chats
        });
    } catch (error) {
        console.error("Error fetching chats:", error);
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .json({
                error: errorMessage.SERVER.INTERNAL_SERVER_ERROR
            });
    }
}

module.exports = {
    fetchMyChats
};