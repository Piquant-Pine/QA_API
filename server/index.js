const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const db = require('../database/index.js');


//middleware
app.use(express.json());
app.use(express.static(__dirname + ''));

// //helper function - promise get all questions - three query method
// const getQuestions = (product_id) => {
//   const questionSQL = `SELECT * FROM questions WHERE id_product = ${product_id};`;
//   //what goes into this new promise
//   return new Promise ((resolve, reject) => {
//    db.connection.query(questionSQL, (err, result) => {
//      if (err) {
//        // res.sendStatus(500);
//        reject(err);
//      } else {
//        // res.send(result);
//        resolve(result);
//        console.log('response is good: ', result);
//      }
//    })
//  })
//  //created a new promise around the query
//  //next create a helper function
//  }

//  const getAnswers = (question_id) => {
//    //create a variable query
//    //return a new promise
//    //db query variable and resolve or reject

//  }

//  const getPhotos = (answer_id) => {

//  }
// const getAll = (product_id) => {
//   return new Promise ((resolve, reject) => {
//     const questionSQL = `SELECT * FROM questions WHERE id_product = ${product_id};`;
//     db.connection.query(questionSQL, (err, result) => {
//        if (err) {
//          // res.sendStatus(500);
//          reject(err);
//        } else {
//          // res.send(result);
//          resolve(result);
//         //  console.log('response is good: ', result);
//        }
//      })
//    })
//    //created a new promise around the query
//    //next create a helper function
//    }

// const getAnswers = (idArr) => {
//   //iterate through container array
//   var array = [];
//   for ( var i = 0; i < idArr.length; i++){
//   array.push(new Promise ((resolve, reject) => {
//     const answerSQL = `SELECT * FROM answers WHERE  = ${idArr[i]};`;
//     db.connection.query(answerSQL, (err, result) => {
//        if (err) {
//          // res.sendStatus(500);
//          reject(err);
//        } else {
//          // res.send(result);
//          resolve(result);
//         //  console.log('response is good: ', result);
//        }
//      })
//    }))
//   }
//   return Promise.all(array);
// }



// //GET - all questions
// app.get('/qa/questions', ((req, res) => {
//   console.log(req.query)
//   const layout = {
//     product_id: req.query.product_id,
//     results: []
//   }
//   var Qcount = 0;
//   var Acount = 0;
//   var Pcount = 0;
//   var container = []



//   getAll(req.query.product_id)
//   .then((resQ) => {
//     for (var i = 0; i < resQ.length; i++) {
//       layout.results.push(resQ[i]);
//     }
//     res.send(layout);
//   })
//   .catch( err => {
//     console.log(err);
//   })

//   // getAnswers(container)
//   // .then(resA => {
//   //   res.send(resA);
//   // })
//   // .catch(err => {
//   //   console.log(err)
//   // })
//   //.then
//   // grab the question id
//       // loop through result and grab each question _ id --> promise array
//   //pass question id into get answers
//   //.then
//   //grab the answer id
//   //pass answer id into get photos
//   //can do indivdual ppromise then use promise.all
// }))

 //one super query
  // nested queries into one function
  // use a callback function or set timeout (1ms)

app.get('/qa/questions', (req, res) => {
  console.log(req.query.product_id);
  const questionSQL = `select * from questions inner join answers on questions.id = answers.id_question inner join photos on answers.id_answer = photos.id_answer WHERE questions.id_product = ${req.query.product_id}`;
  db.connection.query(questionSQL, (err, result) => {
    if (err) {
      console.log('error in first query', err);
      res.sendStatus(500);
    } else {
      const layout = {
        product_id: req.query.product_id,
        results: []
      }
      var answerPhotos = [];
      var questions = [];

        // set current answer
        // loop through result array of objects
        //   if current answer id is the same as current answer
        //     add photo to list
        //   otherwise
        //     save current answer and move to next id

        // => output: current answer with an array of photos

      for(var i = 0; i < result.length; i++){
        var answersObj = {
          answer_id: 0,
          question_id: 0,
          answer_body: '',
          answer_date: '',
          report_answer: 0,
          answer_helpfulness: 0,
          photos: []
        }
        if (answersObj.answer_id !== result[i].id_answer) {
          answerPhotos.push(answersObj);
          answersObj.answer_id = result[i].id_answer
          answersObj.question_id = result[i].id_question
          answersObj.answer_body = result[i].answer_body
          answersObj.answer_date = result[i].answer_date
          answersObj.report_answer = result[i].report_answer
          answersObj.answer_helpfulness = result[i].answer_helpfulness
          answersObj.photos.push(result[i].url)
        } else {
          answersObj.photos.push(result[i].url)
        }
      }

      //do same from above but with my answer photos array and my questions
      //iterate over the answerphotos
      //set questionObj
        //if id question matches then add in question
          //set values of question obj and add
      for (var j = 0; j < result.length; j++) {
        var questionObj = {
          question_id: 0,
          asker_name: '',
          asker_email: '',
          question_body: '',
          question_date: '',
          report_question: 0,
          question_helpfulness: 0,
          answers: [],
        }

        if (j !== result[result.length - 1]) {

            if (result[j].id_question === result[j+1].id_question) {
              console.log('1');
              questionObj.question_id = result[j].id_question;
              questionObj.asker_name = result[j].asker_name;
              questionObj.asker_email = result[j].asker_email;
              questionObj.question_body = result[j].question_body;
              questionObj.question_date = result[j].question_date;
              questionObj.report_question = result[j].report_question;
              questionObj.question_helpfulness = result[j].question_helpfulness;
              questions.push(result[j].id_question);
              layout.results.push(questionObj);

            }


        } else {
          console.log('2')
          questionObj.question_id = result[j].id_question;
          questionObj.asker_name = result[j].asker_name;
          questionObj.asker_email = result[j].asker_email;
          questionObj.question_body = result[j].question_body;
          questionObj.question_date = result[j].question_date;
          questionObj.report_question = result[j].report_question;
          questionObj.question_helpfulness = result[j].question_helpfulness;
          questions.push(result[j].id_question);
          layout.results.push(questionObj);
        }
      }




      res.send(layout)
    }
  })
})



app.listen(3002, function() {
  console.log('listening on port 3002');
});
