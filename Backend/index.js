const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./Database/config');
const limiter = require('./Middleware/rateLimiter');
const userRoutes = require('./Routes/userRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(limiter())
connectDb()


app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api/auth', limiter(15 * 60 * 1000, 5), userRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});