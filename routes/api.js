var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  lessons.find({}, function(err, lesson){
    if (err) throw err;
    res.json(lesson);
  });
});

router.post('/lesson/:id/attend/:flag', function(req, res){
  var id = req.params.id;
  var flag = (req.params.flag == 1) ? true : false;
  lessons.update({lessonId: id},
    {attended : flag},
    function(err, cb){
      if (err) throw err;
      res.send(cb);
    }
  );
  //res.send("success");
});

var lessons = require("../models/lessons.js");

router.get('/lesson/:id', function(req, res){
  var id = req.params.id;
  lessons.findOne({lessonId:id}, function(err, lesson){
    if (err) throw err;
    res.json(lesson);
  });

});

//unit testing
router.get('/testGet', function(req, res){
  lessons.findOne({lessonId:50}, function(err, user){
    if (err) throw err;
    console.log(user);
    res.json(user);
  });
});

module.exports = router;
