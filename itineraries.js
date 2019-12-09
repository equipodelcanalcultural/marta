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
    type: Array 
  },
  likes: {
      type: Array
  }
});

module.exports = Itinerary = mongoose.model("Itinerary", ItinerarySchema);
