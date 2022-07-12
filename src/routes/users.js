const express = require("express");
const router = express.Router();
const Comments = require("../models/comments");

// mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
router.get("/users/comments", (req, res) => {
  res.render("../views/users/users");
});

// mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
router.post("/users/comments", async (req, res) => {
  const { name, email, comments } = req.body;

  const commentsToDataBase = Comments(req.body);
  commentsToDataBase.save().catch((err) => {
    console.log(err);
  });
  console.log("Comentario registrado Satisfactoriamente");
  res.redirect("/");
});

module.exports = router;
