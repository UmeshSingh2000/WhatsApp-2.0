const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDb = require('./Database/config');
const limiter = require('./Middleware/rateLimiter');
const userRoutes = require('./Routes/userRoutes');
const statusCodes = require('./Utils/StatusCodes');
const authenticateToken = require('./Middleware/authenticateToken');
const errorMessage = require('./Utils/errorMessages');
const User = require('./Database/Models/userSchema');
const { processData } = require('./Utils/webHook');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(limiter())
app.use(cookieParser());
connectDb()


// processData() // --> Uncomment this line to process payloads
// This function reads payloads from the 'Payloads' directory and updates the database accordingly.



app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api/auth', userRoutes) //add limiter here later if needed


//auth check
app.get('/api/check-auth', authenticateToken('access'), async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(statusCodes.UNAUTHORIZED).json({
                message: errorMessage.AUTH.UNAUTHORIZED_ACCESS
            });
        }
        const user = await User.findById(id).select('-password -__v');
        if (!user) {
            return res.status(statusCodes.NOT_FOUND).json({
                message: errorMessage.AUTH.USER_NOT_FOUND
            });
        }
        return res.status(statusCodes.OK).json({
            message: "User authenticated",
            user
        });
    } catch (error) {
        console.error("Error in authentication check:", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage.INTERNAL_SERVER_ERROR
        });

    }

})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});