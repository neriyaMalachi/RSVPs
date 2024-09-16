import mongoose from "mongoose";

// Define the schema for an invitation
const DetelsOfThePageSchema = new mongoose.Schema({
  BrideName: {
    type: String,
    required: true,
  },
  GroomName: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Hour: {
    type: Number,
    required: true,
    min: 0,
    max: 23,
  },
  Year: {
    type: Number,
    required: true,
  },
  Month: {
    type: Number,
    required: true,
  },
  Day: {
    type: Number,
    required: true,
  },
  Minute: {
    type: Number,
    required: true,
    min: 0,
    max: 59,
  },
  Description: {
    type: String,
  },
  img: {
    type: String,
  },
});

// Create the model using the schema
const DetelsOfThePage =
  mongoose.models.DetelsOfThePage ||
  mongoose.model("DetelsOfThePage", DetelsOfThePageSchema);


export default DetelsOfThePage;
