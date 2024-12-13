// Import express
const express = require("express");
// Import mongoose
const mongoose = require("mongoose");
// Import cors
const cors = require("cors");

// Create the express app
const app = express();

// Middleware to handle JSON request
app.use(express.json());

// Setup cors policy
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    // If MongoDB is successfully connected
    console.log(
      "MongoDB is successfully connected, database 'ecommerce' is ready for use."
    );
  })
  .catch((error) => {
    // If there is an error connecting to MongoDB
    console.log(error);
  });

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the ecommerce website!");
});

// Get the other routes
const ProductRouter = require("./routes/product");
const CategoryRouter = require("./routes/category");
// Apply the routes
app.use("/products", ProductRouter);
app.use("/categories", CategoryRouter);

// Start the server (Always the last line of code in server.js)
app.listen(5555, () => {
  console.log("Server is running at http://localhost:5555");
});
