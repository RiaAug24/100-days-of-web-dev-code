const express = require("express");

const router = express.Router();

const db = require("../data/database");
const { ObjectId } = require("mongodb");
const { closeDelimiter } = require("ejs");
/*
  or yuou can use 
  const mongodb = require('mongodb');
  const ObjectId = mongodb.ObjectId;
*/

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db.getDb().collection("posts").find().toArray();
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();
  // console.log(authors);
  res.render("create-post", { authors: authors });
});

router.get("/posts/:id/view", async (req, res) => {
  const postId = new ObjectId(req.params.id);
  const post = await db.getDb().collection("posts").findOne({ _id: postId });
  if (!post) {
    return res.status(404).render("404");
  }
  // console.log(post.title);

  post.humanReadableDate = post.date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  post.date = post.date.toISOString();``
  // console.log(post.humanReadableDate)
  res.render("post-detail", { post: post });
});

router.get("/posts/:id/edit", async (req, res) => {
  const postId = new ObjectId(req.params.id);
  const post = await db.getDb().collection("posts").findOne({ _id: postId });
  if (!post) {
    return res.status(404).render("404");
  }
  // console.log(post.title)
  // console.log(post.humanReadableDate)
  res.render("update-post", { post: post });
});

router.post("/posts", async (req, res) => {
  const authorId = new ObjectId(req.body.author);
  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };

  const result = await db.getDb().collection("posts").insertOne(newPost);
  console.log(result);
  res.redirect("/posts");
});

router.post("/posts/:id/edit", async (req, res) => {
  const postId = new ObjectId(req.params.id);
  await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: postId },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          body: req.body.content,
          // date: new Date(),
        },
      }
    );
  res.redirect("/posts");
});

router.post("/posts/:id/delete", async (req, res) => {
  const postId = new ObjectId(req.params.id);
  await db.getDb().collection("posts").deleteOne({ _id: postId });
  res.redirect("/posts");
});

module.exports = router;
