const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name:  { type: String, required: [true, "Author name is required"], minlength: [3, "Author name must be at least 3 characters long"] },
    quotes:  [
        {
            content: { type: String, minlength: [3, "Quote must be at least 3 characters long"] },
            votes: { type: Number, default: 0 }
        }
    ]
}, {timestamps: true });
