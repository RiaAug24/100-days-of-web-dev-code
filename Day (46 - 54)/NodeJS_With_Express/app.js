//Express eases the process of route handling
const fs = require("fs"); //file system pkg
const path = require("path");

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", function (req, res) {
  res.send("<h2>" + new Date().toISOString() + "</h2>");
});

app.get("/", function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><label>Your name: </label><input type="text" name="username"/><button>Submit</button></form>'
  );
});

app.post("/store-user", function (req, res) {
  let username = req.body.username;

  const filePath = path.join(__dirname, "data", "users.json"); //something similiar to python's def function(data_storage, *args).

  const fileData = fs.readFileSync(filePath); //File Content interpretted as texts.

  const existingUsers = JSON.parse(fileData);

  existingUsers.push(username);
  
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
  // console.log(username);
  res.send("<h1>Username saved!</h1>");
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json"); //something similiar to python's def function(data_storage, *args).

  const fileData = fs.readFileSync(filePath); //File Content interpretted as texts.

  const existingUsers = JSON.parse(fileData);

  let responseData = '<ul>'

  for (const user of existingUsers) {
    responseData += '<li>' + user + '</li>';
  }
  responseData += '</ul>';
  res.send(responseData);

});

app.listen(3000);

//NodeJs code
/* let handleRequest = (req, res) => {
  if (req.url === "/currenttime") {
    res.statuscode = 200;
    res.end("<h2>" + new Date().toISOString() + "</h2>");
  } else if (req.url === "/") {
    res.statuscode = 200;
    res.end("<h2>Running on local server....<br>Hello World!</h2>");
  }
};

const server = http.createServer(handleRequest);

server.listen(3000); */
