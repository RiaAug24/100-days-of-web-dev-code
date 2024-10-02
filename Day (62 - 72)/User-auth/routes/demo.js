const express = require("express");
const { ObjectId } = require("mongodb");
const db = require("../data/database");
const bcrypt = require("bcrypt");
const session = require("express-session");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  req.session.inputData = null;
  res.render("signup", { inputData: sessionInputData });
});

router.get("/login", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;
  res.render("login", { inputData: sessionInputData });
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; //userData['email']
  const enteredConfirmEmail = userData["confirm-email"]; //Ojects cannot contain '-' notation keys
  const enteredPassword = userData.password;

  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    enteredPassword.lentgh < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };

    req.session.save(() => {
      res.redirect("/signup");
    });

    return;
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User already exists!",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };
    req.session.save(() => {
      res.redirect("/signup");
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };
  await db.getDb().collection("users").insertOne(user);
  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; //userData['email']
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - please check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(() => {
      res.redirect("/login");
    });
    return;
  }

  const checkPasswordsEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!checkPasswordsEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - please check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(() => {
      res.redirect("/login");
    });
    return;
  }
  req.session.user = {
    id: existingUser._id.toString(),
    email: existingUser.email,
  };
  req.session.isAuthenticated = true;
  req.session.save(() => {
    console.log("Login successfull!");
    res.redirect("/profile");
  });
});

router.get("/admin", async function (req, res) {
  //check for user ticket to grant access
  if (!req.session.isAuthenticated) {
    // if(!req.session.user)
    return res.status(401).render("401");
  }
  const userId = req.session.user.id;
  const user = await db
    .getDb()
    .collection("users")
    .findOne({ _id: ObjectId(userId) });
  // console.log(user);
  if (!user || !user.isAdmin) {
   return res.status(403).render("403");
  }
  res.render("admin");
});

router.get("/profile", function (req, res) {
  //check for user ticket to grant access
  if (!req.session.isAuthenticated) {
    // if(!req.session.user)
    return res.status(401).render("401");
  }
  res.render("profile");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
