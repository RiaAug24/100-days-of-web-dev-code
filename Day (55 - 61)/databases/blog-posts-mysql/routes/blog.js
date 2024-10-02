const express = require("express");

const db = require("../data/database");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async (req, res) => {
  const query = `SELECT p.*,  a.name AS author_name 
                 FROM posts p 
                 INNER JOIN authors a ON p.author_id = a.id`;
  // console.log(query);
  const [posts] = await db.query(query);
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async (req, res) => {
  const [authors] = await db.query("SELECT * FROM AUTHORS");
  res.render("create-post", { authors: authors });
});

router.get("/posts/:id", async (req, res) => {
  //:id here is a query parameter
  const query = ` SELECT p .*, a.name AS author_name, a.email AS author_email
                  FROM posts p
                  INNER JOIN authors a ON p.author_id = a.id
                  WHERE p.id = ? `;
  const [posts] = await db.query(query, [req.params.id]);
  console.log(posts);
  if (!posts || posts.length === 0) {
    res.status(404).render("404");
  }

  const postData = {
    ...posts[0],
    date: posts[0].DATE.toISOString(),
    readableDate: posts[0].DATE.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async (req, res) => {
  const query = `
  SELECT * FROM posts WHERE id = ?
  `;
  const [posts] = await db.query(query, [req.params.id]);
  if (!posts || posts.length === 0) {
    res.status(404).render("404");
  }
  res.render("update-post", { post: posts[0] });
});

router.post("/posts", async (req, res) => {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)", //VALUES(?) is used here so we can pass an enitre array to it, rather then writing mulitple '?' symbols
    [data]
  );
  res.redirect("/posts");
});

router.post("/posts/:id/edit", async (req, res) => {
  const query = `UPDATE posts SET title = ?, summary = ?, body = ?
  WHERE posts.id = ?
  `;

  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ]);

  res.redirect("/posts");
});

router.post("/posts/:id/delete", async (req, res) => {
  const query = `
  DELETE FROM posts WHERE id = ?
  `;
  await db.query(query, [req.params.id]);
  res.redirect("/posts");
});

module.exports = router;
