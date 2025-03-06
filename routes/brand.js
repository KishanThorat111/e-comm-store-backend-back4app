const express = require("express");
const router = express.Router();
const {
  addBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("./../handlers/brand-handler");

router.post("", async (req, res) => {
  const model = req.body;
  const result = await addBrand(model);
  res.send(result);
});

router.get("", async (req, res) => {
  const result = await getBrands();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await getBrand(id);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const model = req.body;
  const id = req.params["id"];
  await updateBrand(id, model);
  res.send({ message: "updated" });
});

router.delete("/:id", async (req, res) => {
  const id = req.params["id"];
  await deleteBrand(id);
  res.send({ message: "deleted" });
});

module.exports = router;
