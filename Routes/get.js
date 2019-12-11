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

module.exports = 
router.get("/api/activities", async (req, res) => {
    itinerary
      .find({ activities: /[^b]/ }, { _id: 0, activities: 1 })
      .then(activities => res.json(activities));
  });

  router.get("/api/usernames", async (req, res) => {
    user
      .find({ username: /[^b]/ }, { _id: 0, username: 1 })
      .then(usernames => res.json(usernames.map(item => item.username)));
  });

  const userRegisterUri = "/api/users/register";
const userLoginUri = "/api/users/login";
const userUri = "/api/users";

const genericGetAll = (uri, model) => {
    router.get(uri, async (req, res) => {
      var data = await model.find((err, results) => {
        if (err) return console.error(err);
        console.log("Success");
      });
      res.json(data);
    });
  };
  const citiesRoute = "/api/cities";
  const itinerariesRoute = "/api/itineraries";
  const routesAndModels = [
    [citiesRoute, city],
    [itinerariesRoute, itinerary],
    [userUri, user]
  ];

  routesAndModels.map(subarray => genericGetAll(subarray[0], subarray[1]));

  router.get("/api/cities/:name", async (req, res) => {
    let ciudadBuscada = req.params.name;
    city
      .findOne({ name: ciudadBuscada })
      .then(ciudad => res.json(ciudad))
      .catch(err => console.log(err));
  
  });

  router.get("/api/itineraries/:city", async (req, res) => {
    let itinerarioBuscado = req.params.city;
    itinerary
      .find(
        { city: itinerarioBuscado },
        {
          _id: 0,
          title: 1,
          user: 1,
          profilePic: 1,
          city: 1,
          price: 1,
          likes: 1,
          rating: 1,
          hashtags: 1,
          duration: 1
        }
      )
      .then(itinerario => res.json(itinerario));
  });

  router.get("/api/itineraries/:city/activities", async (req, res) => {
    let itinerarioBuscado = req.params.city;
    itinerary
      .find({ city: itinerarioBuscado }, { activities: 1, _id: 0 })
      .then(itinerario => res.json(itinerario))
      .catch(err => console.log(err));
  });

  router.get("/api/itineraries/byTitle/:title", async (req, res) => {
    let itinerarioBuscado = req.params.title;
    itinerary
      .find({ title: itinerarioBuscado })
      .then(itinerario => res.json(itinerario))
      .catch(err => console.log(err));
  });
//BUSCAR TODAS LAS ACTIVIDADES DE UN ITINERARIO:
  router.get("/api/itineraries/byTitle/:title/activities", async (req, res) => {
    let itinerarioBuscado = req.params.title;
    itinerary
      .find({ title: itinerarioBuscado }, { _id: 0, title: 1, activities: 1 })
      .then(itinerario => res.json(itinerario))
      .catch(err => console.log(err));
  });



 
 
 
  router.get("/api/activities/:city", async (req, res) => {
    let activitiesByCity = [req.params.city, "Any"];
    activity
      .find({ city: activitiesByCity })
      .then(activity => res.json(activity))
      .catch(err => console.log(err));
  });
  
  router.get("/api/activities/byName/:name", async (req, res) => {
    let activitiesByName = req.params.name;
    activity
      .find({ name: activitiesByName })
      .then(activity =>
        res.send(activity.map(item => [item.name, item.priceRange, item.hasthag]))
      )
      .catch(err => console.log(err));
  });

  router.get(
    "/rutafalsa123",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      user
        .findOne({ username: req.body.username })
        .then(user => {
          res.json(user);
        })
        .catch(err => res.status(404).json({ error: "User does not exist!" }));
    }
  );


  router.get(
    "/googlelogin",
    passport.authenticate("google", { scope: ["profile"] })
  );
  
  const googleLogUri = "/googlelogin";




  router.get("/api/itineraries/byTitle/:title/comments", async (req, res) => {
    let itinerarioBuscado = req.params.title;
    itinerary
      .find({ title: itinerarioBuscado }, { _id: 0, title: 1, comments: 1 })
      .then(comments => res.json({comments:comments, cantidad: comments[0].comments.length}))
      .catch(err => console.log(err));
  });

  

  router.get("/api/itineraries/comments", async (req, res) => {
    itinerary
      .find({}, { _id: 0, comments: 1 })
      .then(comments => res.send(comments))
      .catch(err => console.log(err));
  });

  router.get("/api/comments", async (req, res) => {
    itinerary
      .find({comments: {$exists: true, $not: {$size: 0}}}, {comments: 1 })
      .then(items => res.json(items));
  });
  router.get("/api/comments/id", async (req, res) => {
    itinerary
      .find({comments: {$exists: true, $not: {$size: 0}} }, { comments: {$elemMatch: {_id: req.body._id}} })
      .then(items => res.json(items));
  });

  
  router.get("/api/itineraries/byTitle/:title/comments/id", async (req, res) => {
    let itinerarioBuscado = req.params.title;
    itinerary
      .find({ title: itinerarioBuscado }, { comments: {$elemMatch: {id: req.body.id}} })
      .then(comments => res.json(comments))
      .catch(err => console.log(err));
  });

  router.get("/api/itineraries/byTitle/:title/likes", async (req, res) => {
    let itinerarioBuscado = req.params.title;
    itinerary
      .find({ title: itinerarioBuscado }, { _id: 0, title: 1, rating: 1 })
      .then(rating => res.json(rating))
      .catch(err => console.log(err));
  });



  // router.get("/api/likes/id", async (req, res) => {
  //   itinerary
  //     .find({rating: {$exists: true} }, { rating: {$elemMatch: {id: req.body.id}} })
  //     .then(items => res.json(items));
  // });


  
  router.get("/api/itineraries/likes", async (req, res) => {
    itinerary
      .find({}, { _id: 0, rating: 1 })
      .then(rating => res.send(rating))
      .catch(err => console.log(err));
  });


  router.get("/api/likes", async (req, res) => {
    itinerary
      .find({rating: {$exists: true}}, {rating: 1 })
      .then(items => res.json(items));
  });