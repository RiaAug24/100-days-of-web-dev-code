const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const resData = require("../util/restaurant-data");

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";
  const storedRestaurants = resData.getStoredRestaurants();
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  storedRestaurants.sort((resA, resB) => {
    if ((order === "asc" && resB.name < resA.name) || (order === "desc" && resB.name > resA.name)) {
      return 1;
    } 
    return -1;
  });
  res.render("restaurants", {
    no_of_restaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder
  });
});

router.get("/restaurants/:id", (req, res) => {
  //arrow functions
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();
  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-details", { restaurant: restaurant });
    }
  }

  res.status(404).render("error404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;

  restaurant.id = uuid.v4();

  const storedRestaurants = resData.getStoredRestaurants();

  resData.storeRestaurants(storedRestaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
