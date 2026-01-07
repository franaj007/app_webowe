const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const customers = await prisma.customer.findMany();
  res.json(customers);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const customer = await prisma.customer.findUnique({
    where: { id: id },
  });

  if (!customer) {
    return res.status(404).send("Not Found");
  }
  res.json(customer);
});

module.exports = router;
