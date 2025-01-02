// Load the product model
const Product = require("../models/product");

// Get all products
const getProducts = async (category, page = 1, per_page = 6) => {
  const filter =
    category == "All" || category == null || category == "" ? {} : { category };
  return await Product.find(filter)
    .limit(per_page)
    .skip((page - 1) * per_page)
    .sort({ _id: -1 }); // Sort by newly added products
};

// Get id specific product
const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

// Add a product
const addNewProduct = async (name, description, price, category) => {
  // Create new product
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  // Save the new product into MongoDB
  await newProduct.save();
  return newProduct;
};

// Update a product
const updateProduct = async (id, name, description, price, category) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
    },
    {
      new: true, // Return back the updated data
    }
  );
  return updatedProduct;
};

// Delete a product
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
