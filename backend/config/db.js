const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected MongoDb");
  })
  .catch((err) => {
    console.log(`failed ${err}`);
  });
