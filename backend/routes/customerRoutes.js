const express = require("express");
const router = express.Router();

const customers = require("../data/customers");

// GET ALL CUSTOMERS
router.get("/", (req, res) => {
  res.json(customers);
});

// GET CUSTOMER BY ID
router.get("/:id", (req, res) => {
  const customer = customers.find(
    (c) => c.id === Number(req.params.id)
  );

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  res.json(customer);
});

module.exports = router;