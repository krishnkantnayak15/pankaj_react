"use strict"
const db = require('../config/db')

class Agent {
 static findByName (username, cb) {
   db.query("SELECT * FROM agent_details WHERE user_name = ?;" ,[username],cb)
 }
 static fetchCarrierEdit(state , agentname,cb){
   db.query("SELECT * FROM carrier WHERE state = ?;" ,[state],(err,data)=>{
     db.query("SELECT carrier ,username_carrier, password_carrier FROM credential_storage WHERE agent_name = ?;" ,[agentname],cb)
   })
 }
 static fetchCarrierAdd(state , agentname,cb){
   var diff = []

   db.query("SELECT carrier FROM carrier WHERE state = ?;" ,[state],(err,data)=>{
      db.query("SELECT carrier FROM credential_storage WHERE agent_name = ?;" ,[agentname],(err,docs)=>{
      if(docs.length){
       data.map((carrier)=>{
           for (var i = 0; i < docs.length; i++) {
             console.log("carrier : ",carrier);
             console.log("doc : ",docs[i]);
             if(carrier.carrier == docs[i].carrier){
               console.log("found");
              break
            }
           }
           if(i == docs.length){
             console.log("not found");
              diff.push(carrier)
            }
         })
       }
      else
        diff = data
       console.log("data",data);
       console.log("docs",docs);
       console.log("diff",diff);
       cb(diff);
     })
   })
 }

}

module.exports = Agent
