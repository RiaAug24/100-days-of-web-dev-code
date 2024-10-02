const path = require("path");
const fs = require("fs");
const filepath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filepath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filepath, JSON.stringify(storableRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
