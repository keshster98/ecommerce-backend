// Create schema for category collection
const { Schema, model } = require("mongoose");

// Setup schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

// Converting the schema into a model
const Category = model("Category", categorySchema);

// Export the model
module.exports = Category;
