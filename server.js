var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000;

var fs = require('fs');
const { parse } = require('csv-parse');

app.get('/read-csv', async (req, res) => {
  const fileName = "product_10L.csv";
  fs.createReadStream(fileName)
    .pipe(parse({ delimiter: ",", from_line: 1 }))
    .on("data", function (row) {
      console.log('Row: ', row);
    }).on("end", function () {
      console.log('Process Completed.');
      res.send({ success: true });
    }).on("error", function (error) {
      console.error(error.message);
      res.send({ error: true });
    });
});

app.listen(port, () => {
  console.log('Server started on: ' + port);
});