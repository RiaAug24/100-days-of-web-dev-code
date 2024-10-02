const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");
const app = express();

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);
//middlewares in express
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); //used to serve static files such as CSS or JavaScript files

app.use(function (req, res) {
  //standard middleware to handle 404 error
  res.status(404).render("error404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("error500");
});

app.listen(3000);
