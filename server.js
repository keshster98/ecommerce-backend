require("dotenv").config();
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
  .connect(process.env.MONGODB_URL + "/ecommerce")
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
app.get("/api", (req, res) => {
  res.send("Welcome to the ecommerce website!");
});

// Get the other routes
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");
const authRouter = require("./routes/user");
const imageRouter = require("./routes/image");

// Set a folder as a static path (only works with files, not data)
app.use("/api/uploads", express.static("uploads"));

// Apply the routes
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/auth", authRouter);
app.use("/api/image", imageRouter);

// Start the server (Always the last line of code in server.js)
app.listen(5555, () => {
  console.log("Server is running at http://localhost:5555");
});
