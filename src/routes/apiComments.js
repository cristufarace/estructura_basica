const express = require("express");
const router = express.Router();
const Comments = require("../models/comments");


router.get('/api/comments', async (req, res) => {
    const allComments = await Comments.find().lean().sort({ date: "descending" }); 
    res.render("../views/about", { allComments }); 
  });


  module.exports = router;