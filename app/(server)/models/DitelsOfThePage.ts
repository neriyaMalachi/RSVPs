const mongoose = require("mongoose");

// Define the schema for an invitation
const DetelsOfThePageSchema = new mongoose.Schema({
  BrideName: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from the beginning and end of the string
  },
  GroomName: {
    type: String,
    required: true,
    trim: true,
  },
  Title: {
    type: String,
    required: true,
    trim: true,
  },
  Location: {
    type: String,
    required: true,
    trim: true,
  },
  Hour: {
    type: Number,
    required: true,
    min: 0,
    max: 23,
  },
  Minute: {
    type: Number,
    required: true,
    min: 0,
    max: 59,
  },
  Description: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
    validate: {
      validator: function (v: any) {
        // A simple regex to check if the string looks like a URL
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid image URL!`,
    },
  },
});

// Create the model using the schema
const Invitation = mongoose.model("Invitation", DetelsOfThePageSchema);

module.exports = Invitation;
