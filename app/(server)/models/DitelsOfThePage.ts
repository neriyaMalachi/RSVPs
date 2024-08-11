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
console.log("in of schema");

// Create the model using the schema
export default mongoose.models.DetelsOfThePage ||
mongoose.model("detelsofthepage",DetelsOfThePageSchema)