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
    let updated = await itinerary.find({title: req.params.title}, {_id: 0, comments: 1})

    res.json(updated[0].comments);
  });

  