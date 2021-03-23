import mongoose from 'mongoose';
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question_id: Number,
  answer_id: Number,
  answer_body: String,
  answer_date: {type: Date, default: Date.now},
  answerer_name: String,
  answerer_email: String,
  answer_helpfulness: Number,
  report_answer: Boolean,
  photos: [{Photo}],
   //(how to connect answers from the question id)
})
//one to few: you have a set limit going into photos
//one to many: you dont know so make another schema

// const Answer = mongoose.model("Answer", answerSchema);

// module.exports = {
//   Answer
// }
