const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDb = require('./Database/config');
const limiter = require('./Middleware/rateLimiter');
const userRoutes = require('./Routes/userRoutes');
const messageRoutes = require('./Routes/messageRoute');
const statusCodes = require('./Utils/StatusCodes');
const authenticateToken = require('./Middleware/authenticateToken');
const errorMessage = require('./Utils/errorMessages');
const User = require('./Database/Models/userSchema');
const { processData } = require('./Utils/webHook');
const socketHandler = require('./Sockets/socketHandler');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        // origin: 'http://localhost:5173',
        origin: 'https://whats-app-2-0-ashen.vercel.app',
        credentials: true,
        methods: ['GET', 'POST']
    }
});

// Middlewares
app.use(express.json());
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://whats-app-2-0-ashen.vercel.app',
    credentials: true,
}));
app.use(cookieParser());
app.use(limiter());

// DB Connection
connectDb();

// Uncomment if needed to process payloads
// processData();

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api/auth', userRoutes);
app.use('/api/chat', messageRoutes);

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
});

// Socket.IO setup
socketHandler(io);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
