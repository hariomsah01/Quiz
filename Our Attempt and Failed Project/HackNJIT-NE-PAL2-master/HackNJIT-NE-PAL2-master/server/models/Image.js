// models/Image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    name: String,
    data: Buffer,
    contentType: String,
    userLatitude: Number,
    userLongitude: Number,
  },
  { collection: "ocean" }
); // Specify the collection name

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
