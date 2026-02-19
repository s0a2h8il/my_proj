const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Logging
}

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/health", healthRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Secure Developer Collaboration Platform API is running' });
});

module.exports = app;
