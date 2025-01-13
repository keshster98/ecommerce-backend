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
  // Linkage between the product and categories (Similar to SQL Foreign Key)
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  image: {
    type: String,
  },
});

// Converting the schema into a model
const Product = model("Product", productSchema);

// Export the model
module.exports = Product;
