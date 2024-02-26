// const Product = require("../models/ProductModel");
const Product=require("./../models/ProductModel")

// GET
const getAllProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.send(allProducts);
  console.log("GET PRODUCTS");
};

// DELETE
const deleteProduct = async (req, res) => {
  const _id = req.params.id;

  await Product.findByIdAndDelete(_id);
  console.log("DELETE PRODUCT");
};

// POST
const postProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  newProduct.save();
  console.log("POST PRODUCT");
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
  let productId = req.params.id;
  let findProduct = await Product.findOne({ _id: productId });
  res.send(findProduct);

  console.log("GET PRODUCT BY ID");
};

// PUT PRODUCT
const putProduct = async (req, res) => {
  let productId = req.params.id;
  let updatedProduct = await Product.replaceOne({ _id: productId }, req.body);
  console.log("PUT PRODUCT", updatedProduct);
};

// PATCH PRODUCT
const patchProduct = async (req, res) => {
  let productId = req.params.id;
  let updatedProduct = await Product.findOneAndUpdate({ _id: productId }, req.body);
  console.log("GET UPDATE PRODUCT", updatedProduct);
};

module.exports = {
  patchProduct,
  putProduct,
  getProductById,
  postProduct,
  deleteProduct,
  getAllProducts,
};
