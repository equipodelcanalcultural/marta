const express = require("express");
const router = express.Router();
const itinerary = require("../itineraries");
var ObjectId = require('mongodb').ObjectId;

module.exports = 
router.delete("/api/itineraries/byTitle/:title/comments/delete/:id", async (req, res) => {
var target = ObjectId(req.params.id)
    await itinerary.update(
      { title: req.params.title}, 
      { $pull: {comments: {id: target }}}
    )
    res.json("OK");
  });

  