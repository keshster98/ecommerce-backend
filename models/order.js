// Create schema for order collection
const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending", // pending, paid, failed, completed
    enum: ["pending", "paid", "failed", "completed"], // enum limits the value to the provided options only
  },
  billplz_id: String, // the ID from the bill in billplz
  paid_at: Date,
});

const Order = model("Order", orderSchema);
module.exports = Order;
