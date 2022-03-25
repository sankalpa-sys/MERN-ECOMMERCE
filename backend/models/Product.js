const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {type: String, required:true, unique: true},
    desc: {type: String, required:true},
    img: {type: String, required:true},
    categories: {type: Array},
    size: {type: String},
    color: {type: String },
    inStock: {type: Boolean, default: true},
    price: {type: Number, required:true},
    imgArr: {type:Array},
    colorArr: {type:Array}
},{timestamps: true})

module.exports = mongoose.model("Product", productSchema)