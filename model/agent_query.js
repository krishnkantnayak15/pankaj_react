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
      db.query("SELECT carrier,username_carrier,password_carrier FROM credential_storage WHERE agent_name = ?;" ,[agentname],(err,docs)=>{
      if(docs.length){
       data.map((carrier)=>{
           for (var i = 0; i < docs.length; i++) {
             if(carrier.carrier == docs[i].carrier)
              break
           }
           if(i == docs.length)
              diff.push(carrier)
         })
       }
      else
        diff = data
        cb(diff);
     })
   })
 }
 static insertCredential(req , cb){
   db.query("insert into credential_storage VALUES(?,?,?,?);",[req.agent_name,req.carrier,req.username_carrier,req.password_carrier],cb)
 }

}

module.exports = Agent
