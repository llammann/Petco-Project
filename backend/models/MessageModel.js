const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  {
    collection: "Messages",
    timestamps: true,
  }
);

const Message = mongoose.model("Messages", MessageSchema);

module.exports = Message;
