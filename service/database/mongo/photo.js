import mongoose from 'mongoose';
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  photo_id: Number,
  photo_url: String,
  answer_id: Number, //(how to connect photos to answer id)
})

// const Photo = mongoose.model("Photo", photoSchema);

// module.exports = {
//   Photo
// }