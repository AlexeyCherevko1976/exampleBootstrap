var express=require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static('public'));

//var io = require('socket.io')(http);

const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const jsonParser = bodyParser.json();
const url = "mongodb://localhost:27017/usersdb";
//  
var main=require('./main');
var calc=main.calc;



//delete1();
function delete1(){
  mongoClient.connect(url, function(err, client){
     
    if(err) return console.log(err);
      
    const db = client.db("records");
    db.collection("users").deleteMany({}, function(err, result){
              
        //console.log(result);
        client.close();
    });
  });  
} 


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/test.html');
});

app.get("/loadRecords", function(req, res){
    calc.loadRecords(o=>res.send(o));
});

app.post("/createRecord", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);      
    var userRecord = req.body.record;
    var userLogin = req.body.login;
    var userPassword = req.body.password;
    var user = {record: userRecord, login: userLogin, password: userPassword};      
    var sendInsert=calc.createRecord(user, function (last){ //createUserdb
        res.send(last);
    });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
