const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const port=5000;

app.use(cors());
app.use(express.json());

connectDB();
app.get("/", (req, res) => {
    res.send("Hello");
})
app.listen(port, () => {
    console.log("Server is running on port 5000");
})