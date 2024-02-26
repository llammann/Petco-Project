const express = require("express");
const router = express.Router();
const ProductControllers = require("./../controllers/ProductController");

router.get("/products", ProductControllers.getAllProducts);
router.delete("/products/:id", ProductControllers.deleteProduct);
router.post("/products", ProductControllers.postProduct);
router.get("/products/:id", ProductControllers.getProductById);
router.put("/products/:id", ProductControllers.putProduct);
router.patch("/products/:id", ProductControllers.patchProduct);

module.exports = router;
