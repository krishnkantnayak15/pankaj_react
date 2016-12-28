var express = require('express');
var router = express.Router();
var Agent =require('../model/agent_query')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});


router.post('/login', function(req,res,next){
  Agent.findByName(req.body.username, (error,data) => {
    var obj = {}
    var username= req.body.username;
    var password = req.body.password;
     if(data.length && data[0].user_name == username && data[0].password == password ){
       Agent.fetchCarrierEdit(data[0].state, username,  (error,carriersEdit) => {
         Agent.fetchCarrierAdd(data[0].state, username,(carriersAdd) =>{
           res.json({ carriersEditVar : carriersEdit,carriersAddVar : carriersAdd, agentname : data[0].agent_name});
         });

       })
     }
    else {
      res.json(obj);
    }
  })
})



module.exports = router;
