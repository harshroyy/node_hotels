const express = require('express');
const router = express.Router();
const Menu = require("./../models/menu.js")

router.post('/', async (req, res) => {
    try {
        const menuData = req.body;

        const newMenu = new Menu(menuData);

        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server not found" });
    }
})

// comment added for testing 
module.exports = router;