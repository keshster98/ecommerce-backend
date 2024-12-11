// Create schema for product collection
const { Schema, model } = require("mongoose");

// Setup schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// Converting the schema into a model
const Product = model("Product", productSchema);

// Export the model
module.exports = Product;
