const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/productID');
//maybe this is it?

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


const questionSchema = new mongoose.Schema({
  product_id: Number,
  questions: [{
    question_id: Number,
  question_body: String,
  question_date: {type: Date, default: Date.now},
  asker_name: String,
  asker_email: String,
  question_helpfulness: Number,
  report_question: Boolean,
    answers: [{question_id: Number,
      answer_id: Number,
      answer_body: String,
      answer_date: {type: Date, default: Date.now},
      answerer_name: String,
      answerer_email: String,
      answer_helpfulness: Number,
      report_answer: Boolean,
      photos: [{
        photo_id: Number,
        photo_url: String,
        answer_id: Number, //(how to connect photos to answer id)
      }],
        }]
  }]

})
// const Question = mongoose.model("Question", questionSchema);
