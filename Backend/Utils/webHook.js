const Messages = require('../Database/Models/processed_messages')
const fs = require('fs');
const path = require('path');

const payloadDirectory = path.join(__dirname, '..', 'Payloads')

const processData = async () => {
    try {
        const files = fs.readdirSync(payloadDirectory);

        for (const file of files) {
            const fileData = fs.readFileSync(path.join(payloadDirectory, file), 'utf-8');
            const payload = JSON.parse(fileData);

            const entry = payload.metaData?.entry?.[0];
            const change = entry?.changes?.[0];
            const changeValue = change?.value;

            console.log(`Processing file: ${file}`);
            console.log("changeValue:", changeValue);

            if (!changeValue) {
                console.log("No 'value' in changes for file:", file);
                continue;
            }

            // Process new incoming messages
            if (changeValue.messages) {
                for (const msg of changeValue.messages) {
                    const contact = changeValue.contacts?.[0];

                    const newMessage = {
                        message_id: msg.id,
                        from: msg.from,
                        to: changeValue.metadata?.display_phone_number,
                        body: msg.text?.body || '',
                        timestamp: msg.timestamp,
                        status: 'sent',   // default status when inserting
                        wa_id: contact?.wa_id,
                        name: contact?.profile?.name
                    };

                    await Messages.findOneAndUpdate(
                        { message_id: msg.id },
                        newMessage,
                        { upsert: true, new: true }
                    );
                    console.log(`Inserted/Updated message: ${msg.id}`);
                }
            }

            // Process status updates for existing messages
            if (changeValue.statuses) {
                for (const status of changeValue.statuses) {
                    await Messages.findOneAndUpdate(
                        { message_id: status.id },
                        { $set: { status: status.status, timestamp: status.timestamp } }
                    );
                    console.log(`Updated status: ${status.id} → ${status.status}`);
                }
            }
        }
    } catch (error) {
        console.error("Error reading payload directory:", error);
        throw new Error("Failed to read payload directory");
    }
};

module.exports = {
    processData
}