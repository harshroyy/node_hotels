const mongoose = require("mongoose");
require('dotenv').config();

// const mongoURL = "mongodb://localhost:27017/hotels";

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
    console.log("connected to mongodb");
})

db.on("disconnected", () => {
    console.log("disconnected to mongodb");
})

module.exports = db;