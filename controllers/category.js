// Load the product model
const Product = require("../models/product");

// List all categories
const getCategories = async () => {
  const categories = await Product.distinct("category");
  return categories;
};

module.exports = {
  getCategories,
};
