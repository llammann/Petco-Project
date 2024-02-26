const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: Number,
    description: String,
    img: String,
    category: String,
  },
  {
    collection: "Products",
    timestamps: true,
  }
);

const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
