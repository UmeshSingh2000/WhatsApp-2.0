const Message = require('../Database/Models/processed_messages')

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('send_message', async (data) => {
            const { userId, message, name } = data;

            const newMessage = new Message({
                message_id: socket.id + Date.now(),
                from: 918329446654, // Replace with actual user ID comes from login user
                to: userId,
                body: message,
                status: 'sent',
                timestamp: Date.now(),
                wa_id: userId,
                name: name
            });

            await newMessage.save();
            socket.emit('message_sent', newMessage.toObject())
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
