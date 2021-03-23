const csv = require('csv-parser');
const fs = require('fs');
const results = [];


//read through CSV file and return an array of objects
fs.createReadStream('questions.csv')
.pipe(csv({})).on('data', (data) => {
  results.push(data);
}).on('end', () => {
  console.log(results);
});