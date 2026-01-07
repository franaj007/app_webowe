const express = require("express");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/index.html"));
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const existingCustomer = await prisma.customer.findUnique({
    where: { email: email },
  });

  if (existingCustomer) {
    return res.status(422).json({ message: "Email already exists" });
  }

  const newCustomer = await prisma.customer.create({
    data: { firstName, lastName, email },
  });
  console.log(newCustomer);

  res.redirect("/");
});

module.exports = router;
