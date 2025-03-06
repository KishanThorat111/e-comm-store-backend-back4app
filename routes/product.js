const express = require("express");
const router = express.Router();

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("./../handlers/product-handler");

// Add a new product
router.post("/", async (req, res) => {
  let model = req.body;
  let result = await addProduct(model);
  res.send(result);
});

// Get all products
router.get("/", async (req, res) => {
  let result = await getAllProducts();
  res.send(result);
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  let id = req.params["id"];
  let result = await getProduct(id);
  res.send(result);
});

// Update a product by ID
router.put("/:id", async (req, res) => {
  let model = req.body;
  let id = req.params["id"];
  await updateProduct(id, model);
  res.send({ message: "updated" });
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteProduct(id);
  res.send({ message: "deleted" });
});

module.exports = router;
