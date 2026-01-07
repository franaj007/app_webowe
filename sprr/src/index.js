const express = require("express");
const path = require("path");
const customerRouter = require("./routes/customerRouter");
const ssrRouter = require("./routes/ssrRouter");

const app = express();
const PORT = 4000;

// Middleware (Zadanie 6 i obsługa formularzy)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/customers", customerRouter);
app.use("/", ssrRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
