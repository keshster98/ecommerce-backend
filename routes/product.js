// Import express
const express = require("express");
// Import mongoose
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// Create a router for product
const router = express.Router();
// Load the product model
const Product = require("../models/product");
// Import functions from controller
const {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { isAdmin } = require("../middleware/auth");

/* 
  Create the CRUD routes:

  1 - POST /products - Add a new product
  2 - GET /products - List all products
  3 - GET /products/:id - Get specific product details by its ID
  4 - PUT /products/:id - Update a product by its ID
  5 - DELETE /products/:id - Delete a product by its ID
  6 - GET /categories - List all categories
  7 - GET /products?category=Consoles - Get products by category
*/

// 2
router.get("/", async (req, res) => {
  try {
    // Retrieve the data from req.body
    const category = req.query.category;
    const page = req.query.page;
    const per_page = req.query.per_page;
    // Use getProducts from the controller to load the product data
    const products = await getProducts(category, page, per_page);
    // If there are issues with the category query
    // if (products.length === 0) {
    //   /* product.length because it is returning either an array filled with elements or an empty array */
    //   return res.status(404).send({
    //     error: `No products found for the category "${category}".`,
    //   });
    // }
    // Send the products if found
    res.status(200).send(products);
  } catch (error) {
    // If there is an error, return the error code
    res.status(500).send({
      error: error._message,
    });
  }
});

// 3
router.get("/:id", async (req, res) => {
  try {
    // Retrieve the id from the URL
    const id = req.params.id;
    // Validate the ID format before querying the database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `Invalid ID format: "${id}". A valid MongoDB ObjectId is required.`,
      });
    }
    // Use getProduct from the controller to load the product by id
    const product = await getProduct(id);
    // If the product does not exist
    if (!product) {
      /* !product because it is returning either a single object or null */
      return res.status(404).send({
        error: `Error: No match for a product found with the id "${id}".`,
      });
    }
    // Send the product if found
    res.status(200).send(product);
  } catch (error) {
    // Handle unexpected errors
    res.status(500).send({
      error: error._message,
    });
  }
});

// 1
router.post("/", isAdmin, async (req, res) => {
  try {
    // Retrieve the data from req.body
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;
    // Check for errors
    if (!name || !price || !category) {
      return res.status(400).send({
        error: "Error: Required product data is missing!",
      });
    }
    // If no errors, pass in all the data to addNewProduct function from controller
    const newProduct = await addNewProduct(
      name,
      description,
      price,
      category,
      image
    );
    res.status(200).send(newProduct);
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// 4
router.put("/:id", isAdmin, async (req, res) => {
  try {
    // Retrieve id from URL
    const id = req.params.id;
    // Retrieve the data from req.body
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;
    // Check for errors
    if (!name || !price || !category) {
      return res.status(400).send({
        error: "Error: Required product data to be updated is missing!",
      });
    }
    // Pass in the data into the updateProduct function
    const updatedProduct = await updateProduct(
      id,
      name,
      description,
      price,
      category,
      image
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// 5
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    // Retrieve the id from the URL
    const id = req.params.id;
    // Validate the ID format before querying the database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `Invalid ID format: "${id}". A valid MongoDB ObjectId is required.`,
      });
    } else {
      // Use getProduct from the controller to load the product by id
      const product = await getProduct(id);
      // If the product does not exist
      if (!product) {
        /* !product because it is returning either a single object or null */
        return res.status(404).send({
          error: `Error: No match for a product found with the id "${id}".`,
        });
      }
    }
    // Trigger the deleteProduct function
    await deleteProduct(id);
    res.status(200).send({
      message: `Alert: Product with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
