const mongoose = require('mongoose');
const { Schema } = mongoose;


const processedMessageSchema = new Schema({
    message_id: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
    timestamp: { type: String, },
    wa_id: { type: String },
    name: { type: String }
}, {
    timestamps: true
});


module.exports = mongoose.model('processed_messages', processedMessageSchema)