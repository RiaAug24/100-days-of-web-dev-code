const express = require("express");
const app = express();
const db = require("./data/database");
const quoteRoutes = require("./routes/quotes.routes");
app.use("/quote", quoteRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something went wrong",
  });
});

db.initDB()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Connecting to the database failed");
  });
