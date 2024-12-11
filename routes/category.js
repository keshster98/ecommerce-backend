// Import express
const express = require("express");
// Create a router for product
const router = express.Router();
// Load the product model
const Product = require("../models/product");
// Import functions from controller
const { getCategories } = require("../controllers/category");

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).send(categories);
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
