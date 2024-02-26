const express = require("express");
const app = express();
const cors = require("cors");

const PetRouter = require("./../backend/routers/PetRouters");
const UserRouter = require("./routers/UserRouters");
const NewsRouter = require("./routers/NewsRouter");
const ProductRouter = require("./routers/ProductRouter");

const bodyParser = require("body-parser");
require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT || 5050;
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hallo");
});

app.use("/", PetRouter);
app.use("/", UserRouter);
app.use("/", NewsRouter);
app.use("/", ProductRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

