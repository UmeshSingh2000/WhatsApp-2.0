import api from "../Utils/axios"

const fetchMyChats = async () => {
    try {
        const res = await api.get('/chat/myChats')
        return res.data
    } catch (error) {
        console.error("Error fetching my chats:", error)
        throw error
    }
}

export {
    fetchMyChats
}