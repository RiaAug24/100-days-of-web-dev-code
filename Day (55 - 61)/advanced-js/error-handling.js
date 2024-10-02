const fs = require("fs");

function readFile() {
  try {
    const fileData = fs.readFileSync("data.json");
  } catch {
    console.log("Error! File not found!");
  }
  finally {
    console.log("Hello There! Thanks for trying out the try & catch mechanism in JavaScript.")
  }
}
readFile();
