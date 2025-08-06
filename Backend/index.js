const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./Database/config');
const limiter = require('./Middleware/rateLimiter');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin : 'http://localhost:5173'
}));
app.use(limiter())
connectDb()


app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});