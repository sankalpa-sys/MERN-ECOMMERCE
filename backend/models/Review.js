const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const reviewSchema = new mongoose.Schema({
    postedBy: {type: ObjectId, ref:"User", required:true},
    productId: {type: String, required:true},
    review:  {type: String, required:true}
    
},{timestamps: true})

module.exports = mongoose.model("Review", reviewSchema)