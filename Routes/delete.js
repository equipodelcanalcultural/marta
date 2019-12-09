const express = require("express");
const router = express.Router();
const itinerary = require("../itineraries");


module.exports = 
router.delete("/api/itineraries/byTitle/:title/comments/delete", async (req, res) => {

    await itinerary.updateOne(
      { title: req.params.title}, 
      { $pull: {"comments": {id: req.body.id}}}
    )
    res.json("OK");
  });

  router.put("/api/itineraries/byTitle/:title/dislikes", async (req, res) => {
    await itinerary.updateOne(
      { title: req.params.title },
      {
         $inc: {"rating": -1 },
         $pull: {"likes": req.body.username }
        }
    )
    res.json(req.body.username);
    console.log(req.body.username);
  });
  
  