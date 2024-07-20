const express = require('express');
const connectDatabase = require('./models/database');
const userRoutes=require("./routes/userRoutes");
const groupRoutes=require("./routes/groupRoutes");
const app = express();
const port = 8082;
require('dotenv').config();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
  });
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/group',groupRoutes);
connectDatabase();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
