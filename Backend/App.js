const express = require('express');
const mongoose = require('mongoose');
const createRole = require("./database/db");
const generateToken = require('./auth/generateToken');
const verifyToken = require('./auth/verifyToken');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const publicRoutes = require('./routes/publicRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const userSubscriptionRoutes = require("./routes/userSubsriptionRoutes");
const cameraRoutes = require("./routes/cameraRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const bucketRoutes = require("./routes/bucketRoutes");
const cors = require('cors');
const subscriptionPlanRoutes = require("./routes/subscriptionPlanRoutes");
const app = express();
const PORT = 8081;
const winston = require('winston');
const patientContentRoutes = require('./routes/patientContentRoutes');
const patientRoutes=require("./routes/patientRoutes");
const dotenv = require('dotenv');
const result = dotenv.config();

/*if (result.error) {
    console.error('Error loading .env file:', result.error);
} else {
    console.log('Environment variables loaded successfully:', result.parsed);
}*/


// Initialize logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Logging middleware
app.use((req, res, next) => {
    logger.info(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(express.json());

createRole();

// Protected route that requires authentication
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully', user: req.user });
});

// Routes
app.use('/api/users', userRoutes);
app.use("/api/video", videoRoutes);   
app.use("/api/public", publicRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/superAdminPlan", subscriptionPlanRoutes);
app.use("/api/userSubscription", userSubscriptionRoutes);
app.use("/api/camera", cameraRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/bucket", bucketRoutes);
app.use("/api/PatientContent",patientContentRoutes);
app.use("/api/patient",patientRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    // Log the error
    console.log(err);
    logger.error(`${new Date().toISOString()} - ${err.message}`, { error: err.stack });
    // Send an error response
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Main file To run