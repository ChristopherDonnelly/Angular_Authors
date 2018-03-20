const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name:  { type: String, required: [true, "Author name is required"], minlength: [3, "Author name must be at least 3 characters long"] }
}, {timestamps: true });
