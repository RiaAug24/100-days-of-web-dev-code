// const example = {
//   First: [1, "One", "First"],
// };

// console.log(example.First[2]);

const items = [
  { name: "Bike", price: 200 },
  { name: "TV", price: 200 },
  { name: "Album", price: 10 },
  { name: "Book", price: 5 },
  { name: "Phone", price: 300 },
  { name: "Computer", price: 1000 },
  { name: "Keyboard", price: 80 },
];

// Filter() method
const filteredItems = items.filter((item) => {
  //Used to filter an array and store the filtered array to a new array
  return item.price <= 100;
});

console.log(filteredItems);

// Map() method
const itemNames = items.map((item) => {
  //Used to filter an array and store the filtered array to a new array
  return item.name;
});

console.log(itemNames);

// Find() Method

const foundItem = items.find((item) => {
  return item.name === "Keyboard";
});

console.log(foundItem);

// Reduce() method

const totalAmount = items.reduce((curTotal, items) => {
  return items.price + curTotal;
}, 0);

console.log("\n$" + totalAmount);
