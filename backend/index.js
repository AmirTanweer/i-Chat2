const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const UserRouter=require('./routes/auth')
const port=5000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/auth',UserRouter);
app.listen(port, () => {
    console.log("Server is running on port 5000");
})