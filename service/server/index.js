const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const db = require("../database/index.js");

//middleware
app.use(express.json());
app.use(express.static(__dirname + ""));

app.get(`/qa/questions/`, (req, res) => {
  var photosArr = [];

  const photoSql = `select * from photos where id_answer in (select id_answer from answers where id_question in (select id from questions where id_product = ${req.query.product_id}))`;
  db.connection.query(photoSql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < result.length; i++) {
        photosArr.push(result[i]);
      }
    }
  });

  const questionSQL = `select * from questions inner join answers on questions.id = answers.id_question WHERE questions.id_product = ${req.query.product_id}`;
  db.connection.query(questionSQL, (err, result) => {
    if (err) {
      console.log("error in first query", err);
      res.sendStatus(500);
    } else {
      const layout = {
        product_id: req.query.product_id,
        results: [],
      };
      var answerPhotos = [];
      var questions = [];

      for (var i = 0; i < result.length; i++) {
        var answersObj = {
          answer_id: 0,
          question_id: 0,
          answer_body: "",
          answer_date: "",
          report_answer: 0,
          answer_helpfulness: 0,
          photos: [],
        };
        if (answersObj.answer_id !== result[i].id_answer) {
          answerPhotos.push(answersObj);
          answersObj.answer_id = result[i].id_answer;
          answersObj.question_id = result[i].id_question;
          answersObj.answer_body = result[i].answer_body;
          answersObj.answer_date = result[i].answer_date;
          answersObj.report_answer = result[i].report_answer;
          answersObj.answer_helpfulness = result[i].answer_helpfulness;
        }
      }
      for (var p = 0; p < photosArr.length; p++) {
        for (var index = 0; index < answerPhotos.length; index++) {
          if (answerPhotos[index].answer_id === photosArr[p].id_answer) {
            answerPhotos[index].photos.push(photosArr[p].url);
          }
        }
      }

      var idArr = [];
      for (var j = 0; j < result.length; j++) {
        var questionObj = {
          question_id: 0,
          asker_name: "",
          asker_email: "",
          question_body: "",
          question_date: "",
          report_question: 0,
          question_helpfulness: 0,
          answers: [],
        };
        if (idArr.indexOf(result[j].id_question) === -1) {
          questionObj.question_id = result[j].id_question;
          questionObj.asker_name = result[j].asker_name;
          questionObj.asker_email = result[j].asker_email;
          questionObj.question_body = result[j].question_body;
          questionObj.question_date = result[j].question_date;
          questionObj.report_question = result[j].report_question;
          questionObj.question_helpfulness = result[j].question_helpfulness;
          idArr.push(result[j].id_question);
          layout.results.push(questionObj);
        }
      }

      for (var k = 0; k < layout.results.length; k++) {
        var que_id = layout.results[k].question_id;
        for (var a = 0; a < answerPhotos.length; a++) {
          var ans_id = answerPhotos[a].question_id;
          if (que_id === ans_id) {
            layout.results[k].answers.push(answerPhotos[a]);
          }
        }
      }
      res.send(layout);
    }
  });
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
