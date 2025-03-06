const Brand = require("./../db/brand");

async function addBrand(model) {
  let brand = new Brand({
    name: model.name,
  });
  await brand.save();
  return brand.toObject();
}

async function getBrands() {
  let brands = await Brand.find();
  return brands.map((b) => b.toObject());
}

async function getBrand(id) {
  let brand = await Brand.findById(id);
  return brand.toObject();
}

async function updateBrand(id, model) {
  await Brand.findOneAndUpdate({ _id: id }, model);
}

async function deleteBrand(id) {
  await Brand.findByIdAndDelete(id);
}

module.exports = {
  addBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
