var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');

router.get('/content', function(req, res) {
  // Return contents;
  fs.readdir(path.join(__dirname, '../content'), (err, files) => {
    if (err) {
      console.log("ERROR: error getting directory.")
      console.log(err);
      res.json({'ERROR': err});
    } else {
      res.json(files);
    }
  });
});

module.exports = router;
