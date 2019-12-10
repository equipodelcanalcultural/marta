
const express = require("express");
const router = express.Router();
const city = require("../city");
const itinerary = require("../itineraries");
const activity = require("../activities.js");
const user = require("../user.js");
const bcrypt = require("bcrypt");
const db = require("../database");
const jwt = require("jsonwebtoken");
const config = require("../config");
const secretOrKey = config.secretOrKey;
const passport = require("passport");
var ObjectID = require('mongodb').ObjectID;

module.exports = router.put("/api/users/:username", async (req, res) => {
  await user.updateOne(
    { username: req.params.username },
    { username: req.body.username }
  );
  res.json("OK");
});

router.put("/api/users/type/:username", async (req, res) => {
  await user.updateOne(
    { username: req.params.username },
    { googleAccount: false }
  );
  res.json("OK");
});

router.put("/api/users/type/:username", async (req, res) => {
  await user.updateOne(
    { username: req.params.username },
    { googleAccount: false }
  );
  res.json("OK");
});

const addActivitiesToItinerary = (title, activitiesArray) => {
  router.put("/api/updateitineraries/", async (req, res) => {
    await itinerary.findOneAndUpdate(
      { title: title },
      { activities: activitiesArray }
    );
    res.json("OK");
  });
};

router.put("/api/itineraries/byTitle/:title", function(req, res) {
  let itineraryByTitle = req.params.title;
  itinerary.updateOne({}, { title: itineraryByTitle }, { $set: { rating: 6 } });
  res.send(`${itineraryByTitle} updated`);
});

router.put("/api/itineraries/byTitle/:title/comments", async (req, res) => {
  let comment = {
    _id: new ObjectID(),
    username: req.body.username,
    text: req.body.text
  }
  await itinerary.updateOne(
    { title: req.params.title },
    { $push: {comments: comment }}
  )
  res.json("OK");
});


router.put("/api/itineraries/byTitle/:title/comments/update", async (req, res) => {

  await itinerary.updateOne(
    { title: req.params.title, "comments._id": req.body._id}, 
    { $set: {"comments.$.text": req.body.text}}
  )
  res.json(req.body.text);
});


//Rutas Likes 

  router.put("/api/itineraries/byTitle/:title/likes", async (req, res) => {
    let rating = {
            title: req.params.title
    }
    await itinerary.updateOne(
      { title: req.params.title },
      { 
        $inc: {"rating": 1 },
        $push: {"likes": req.body.username}
    }
    ),
    await user.updateOne(
      { $push: {itinerariesLiked: rating.title }}
    )
    res.json(req.body.username);
    console.log("uasdasd:",req.body.username)
    console.log(rating.title)
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
  
  
  router.put("/api/itineraries/byTitle/:title/likes/update", async (req, res) => {
  
    await itinerary.updateOne(
      { title: req.params.title, "rating.id": req.body.id}, 
      { $set: {"rating.$.text": req.body.text}}
    )
    res.json("OK"); 
  });

  