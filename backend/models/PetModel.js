const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    gender: String,
    age: Number,
    color: String,
    size: String,
    city: String,
    breed: String,
    img: String,
    bio: String,
    price:String
  },
  {
    collection: "Pets",
    timestamps: true,
  }
);

const Pet = mongoose.model("Pets", PetSchema);

module.exports = Pet;
