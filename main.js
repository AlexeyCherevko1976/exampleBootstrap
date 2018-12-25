const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
  
const app = express();
const jsonParser = bodyParser.json();
const url = "mongodb://localhost:27017/usersdb";

;(function() {

  // calc - основная функция для библиотеки
  function calc(value) {
    // ...
  }

  // вспомогательная переменная
  var version = '1.1.1';  


  function loadRecords(callback){
    mongoClient.connect(url, function(err, client){
    client.db("records").collection("users").find({}).toArray(function(err, users){
      while (users.length<6){
        users.push({record:'', login:'', password:""});
      }
      var a1=users.splice(-6, 6);
      var a2=[];
      a1.forEach(o=>{delete o._id; a2.push(o)});
      callback(a2);
      client.close();
    });
    });
  }



   function createRecord(user, callback){ 

    mongoClient.connect(url, function(err, client){
    client.db("records").collection("users").find({}).toArray(function(err, users){
      //console.log(users);
 
           client.db("records").collection("users").insertOne(user, function(err, result){
                users.push(user);
                while (users.length<6){
                  users.push({record:'', login:'', password:""});
                }
                var a1=users.splice(-6, 6);
                var a2=[];
                a1.forEach(o=>{delete o._id; a2.push(o)});
                callback(a2);             
                client.close();
            });

      //callback('a2');
      //client.close();
    });
    });
  
         
  }

deleteAll()
function deleteAll() {

    mongoClient.connect(url, function(err, client){
        client.db("users1").collection("users").drop(function(err, result){
 
            client.close();
            
        });
    });

}

  function deleteUser(id, callback){
    mongoClient.connect(url, function(err, client){
        client.db("users1").collection("users").findOneAndDelete({_id: id}, function(err, result){
            var answer;  
            if(err){ answer=res.status(400).send();
            }else{
              answer=result.value;
            }
            callback(answer);
            client.close();
            
        });
    });
}


  calc.loadRecords=loadRecords;
  calc.createRecord=createRecord;

  module.exports.calc=calc;
}());