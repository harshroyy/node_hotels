const mongoose = require('mongoose');

const menuItems = new mongoose.Schema({
     name: {
        type: String,
        required: true,
     },
     price: {
        type: Number,
        required: true,
     },
     taste: {
        type: String,
        enum: ["sweet", "sour", "spicy"]
     },
})

const Menu = mongoose.model("Menu", menuItems);
module.exports = Menu;