const express = require("express");
// set up the order router
const router = express.Router();
// import all the order functions
const {
  getOrders,
  addNewOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

/*
    GET /orders
    POST /orders
    PUT /orders/:id
    DELETE /orders/:id
*/

// addNewOrder
router.post("/", async (req, res) => {
  try {
    // const customerName = req.body.customerName;
    // const customerEmail = req.body.customerEmail;
    // const products = req.body.products;
    // const totalPrice = req.body.totalPrice;
    const {
      customerName = "",
      customerEmail = "",
      products = [],
      totalPrice = 0,
    } = req.body;
    const newOrder = await addNewOrder(
      customerName,
      customerEmail,
      products,
      totalPrice
    );
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

//getOrders
router.get("/", async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// getOrder
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(400).send("Order not found");
    }
  } catch (error) {
    res.status(400).send({ error: error._message });
  }
});

// updateOrder
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const updatedOrder = await updateOrder(id, status);
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

// deleteOrder
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteOrder(id);
    res.status(200).send({
      message: `Order with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ error: error._message });
  }
});

module.exports = router;
