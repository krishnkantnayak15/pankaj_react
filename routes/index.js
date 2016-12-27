var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});
router.post('/login', function(req,res,next){
console.log('inside login', req.body)
 res.json({name:"hee"})
})

module.exports = router;
