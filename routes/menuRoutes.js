const express = require('express');
const router = express.Router();
const Menu = require("./../models/menu.js")

// GET request to fetch all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        console.log('menu items fetched');
        res.status(200).json(menuItems);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server failed to fetch menu items" });
    }
});

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