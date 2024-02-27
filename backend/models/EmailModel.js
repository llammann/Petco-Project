const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
  },
  {
    collection: "Emails",
    timestamps: true,
  }
);

const Email = mongoose.model("Emails", EmailSchema);

module.exports = Email;
