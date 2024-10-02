const path = require("path");
const { ObjectId } = require("mongodb");
const express = require("express");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session");
const db = require("./data/database");
const demoRoutes = require("./routes/demo");

const mongoDbStore = mongoDbSession(session);
const app = express();

const sessionStore = new mongoDbStore({
  uri: "mongodb://127.0.0.1:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "web-dev-bootcamp-2024",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 60 * 1000,
    },
  })
);


//Custom middleware function
app.use(async function (req, res, next) {
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;

  if (!user || !isAuth) {
    return next();
  }

  const userDoc = await db
    .getDb()
    .collection("users")
    .findOne({ _id: new ObjectId(user.id) });

  const isAdmin = userDoc.isAdmin;

  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;
  next();
});

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
