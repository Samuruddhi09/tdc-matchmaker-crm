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

// ADD CUSTOMER
router.post("/", (req, res) => {
  const newCustomer = {
    id: customers.length + 1,
    ...req.body,
  };

  customers.push(newCustomer);

  res.status(201).json({
    message: "Customer added successfully",
    customer: newCustomer,
  });
});

module.exports = router;