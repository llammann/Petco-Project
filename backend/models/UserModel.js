const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    surname: String,
    username: String,
    password: String,
    email: String,
    basket: [],
    orders: [],
    balance: Number,
    adopts:[]
  },
  {
    collection: "Users",
    timestamps: true,
  }
);

const User = mongoose.model("Users", UserSchema);

module.exports = User;
