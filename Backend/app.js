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
const fs = require('fs');
const https = require('https');

const serverOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/surgi-cloud.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/surgi-cloud.com/fullchain.pem')
};

const server = https.createServer(serverOptions, app);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

app.use((req, res, next) => {
    logger.info(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: ['https://www.surgi-cloud.com','https://surgi-cloud.com'], // Allow these domains to access resources
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // if you need to handle cookies
}));

app.use(express.json());

createRole();
app.get("/public",(req,res)=>
{
    res.status(200).json("Welcome to streaming app");
})
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully', user: req.user });
});

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

app.use((err, req, res, next) => {
    console.log(err);
    logger.error(`${new Date().toISOString()} - ${err.message}`, { error: err.stack });
    res.status(500).json({ error: 'Internal Server Error' });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
