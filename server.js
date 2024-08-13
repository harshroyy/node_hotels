const express = require('express')
const app = express()
const db = require("./db")
require('dotenv').config();
const passport = require("./auth.js");


const bodyParser = require("body-parser")
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000;


// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toString()}] Request made to : ${req.originalUrl}`);
    next();
} 
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', (req, res) => {
    res.send('Welcome to our hotel nee-san!')
})


// Import the router files
const personRoutes = require("./routes/personRoutes.js")
const menuRoutes = require("./routes/menuRoutes.js");

// use the routers
app.use('/person', localAuthMiddleware, personRoutes);
app.use('/menu', menuRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});      