/*------------
  DEPENDENCIES
  ------------*/
const express   = require('express');
const extractor = require('article-extractor');
const bodyParser = require("body-parser");
const http = require('http');
const jsonfile = require('jsonfile');
const fs = require('fs');

/*--------------
  INITIALIZATION
  --------------*/
//setup for express app
const app = express();

//setup for basic json DB
const path = "./db/db.json";
var db = jsonfile.readFileSync(path);

/*-----
  SETUP
  -----*/

app.use('/static', express.static(__dirname + '/public'));

//set body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


/*---------
  WEB PAGES
  ---------*/

//index
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/add', function(req, res){
    res.sendFile(__dirname + '/views/add.html');
});

const testPage = 'https://krebsonsecurity.com/2014/05/antivirus-is-dead-long-live-antivirus/'

//GET request for article
app.get('/article', function(req, res){
    //TESING WEBPAGE
    db.articles.find(function(err,docs){
        res.send(docs[1]);
    });
});

/*-------------
  POST REQUESTS
  -------------*/

//user submits articles from add.html here
app.post('/postArticle', function(req, res){
    uploadArticle(req.body.link);
});

app.listen(8080, function(){
    console.log('App running on port 8080');
});

/*----------------
  DB communication
  ----------------*/

function getArticle(index){
    //just pseudo-random number gen for testing article picking.
    var num = Math.floor(Math.random() * 3);
}

function appendArticle(data){
    var newArticle = {
        "tag" : db.db.length,
        "article" : data
    }
    db.db.push(newArticle)
}

function query(tag){
    for(var i=0; i<db.db.length; i++){
        if(db.db[i].tag == tag){
            console.log(db.db[i].article);
            return db.db[i].article;
        }
    }
}

function writeDBToFile(){
    console.log("*Writing To File*");
    jsonfile.writeFile(path, db, function(err){
        console.log(err);
    });
}

//send the article to the db
function uploadArticle(url){
    
}













