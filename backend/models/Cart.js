const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: {
          type: Number,
          default: 1,
        },
        title: {
          type: String,
        },
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        img: {
            type: String
        },
        price: {type: Number}
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
