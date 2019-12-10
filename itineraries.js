const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItinerarySchema = new Schema({
user: {
        type: String
    },
  title: {
    type: String
  },
  city: {
    type: String
  },
  ProfilePic: {
    type: String
  },

  rating: {
    type: Number
  },
  activities: {
    type: Array
  },

  duration: {
    type: Number
  },
  price: {
    type: Number
  },
  priceRange: {
    type: String
  },
  hashtags: {
    type: Array
  },
  comments: {
    type: Array,
  },
  likes: {
      type: Array
  }
});

module.exports = Itinerary = mongoose.model("Itinerary", ItinerarySchema);

var newItinerary = new Itinerary({
  title: "viajecito",
  ProfilePic: "fotito",
  rating: 100,
  duration: 20,
  price: 0,
  hashtag: [0, 1, 1, 2]
});

console.log(
  newItinerary.title,
  newItinerary.ProfilePic,
  newItinerary.rating,
  newItinerary.duration,
  newItinerary.price
);
