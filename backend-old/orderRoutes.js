const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Place order
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ message: "Order placed successfully", order });
});

// Get orders
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("products.productId").populate("userId");
  res.json(orders);
});

module.exports = router;
