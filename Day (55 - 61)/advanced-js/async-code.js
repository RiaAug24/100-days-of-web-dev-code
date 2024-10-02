const fs = require("fs/promises");

async function readFile() {
  let fileData;
  //   fs.readFile("data.txt", (err, fileData) => {  // Callback function to handle asynchronous tasks
  //     console.log("File parsing done.");
  //     console.log(fileData.toString());
  //   });

  // fs.readFile("data.txt")  // Promise w/o async await
  // .then((fileData) => {
  //   //readFile is now a promise here in this case.
  //   console.log("File parsing done.");
  //   console.log(fileData.toString());
  // })
  // .then(() => {})
  // .catch((err) => {
  //   console.log(err);
  // });

   // async await mechanism
  //readFile is now a promise here in this case.
  console.log("File parsing done.");
  console.log(fileData.toString());

  console.log("Hey there!");
  fileData = await fs.readFile("data.txt");
}

readFile();
