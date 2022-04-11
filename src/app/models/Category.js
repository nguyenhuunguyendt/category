const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Category = new Schema({
    name: { type: String, maxlength: 255 },
    image: { type: String, maxlength: 255 },
    position: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Category', Category)