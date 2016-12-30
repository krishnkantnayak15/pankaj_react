var express = require('express');
var router = express.Router();
var Agent =require('../model/agent_query')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

var state
var agent
router.post('/login', function(req,res,next){
  Agent.findByName(req.body.username, (error,data) => {
    console.log("data check" ,  data)
    var obj = {}
    var username= req.body.username;
    var password = req.body.password;
    state = data[0].state
    agent = data[0].agent_name
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

router.post('/add-credential', function(req,res,next){
  Agent.insertCredential(req.body , () => {
    Agent.fetchCarrierEdit( state, req.body.agent_name,  (error,carriersEdit) => {
      Agent.fetchCarrierAdd(state, req.body.agent_name,(carriersAdd) =>{
        res.json({ carriersEditVar : carriersEdit,carriersAddVar : carriersAdd, agentname : agent});
      });
    })
  })
})



module.exports = router;
