/*------------
  DEPENDENCIES
  ------------*/
const express   = require('express');
//const mongojs   = require('mongojs');
const extractor = require('article-extractor');
const bodyParser = require("body-parser");
const http = require('http');

const bendb = require('./db.js');

/*--------------
  INITIALIZATION
  --------------*/

const app = express();
//const db  = mongojs('localhost:27017/test', ['users', 'articles']); 


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

var webpages = ['https://krebsonsecurity.com/2014/05/antivirus-is-dead-\
long-live-antivirus/']

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
    var num = Math.floor(Math.random() * 3);
    db.articles.find(function(err, docs){
        return docs[num];
    });
}



//send the article to the db
function uploadArticle(url){
    extractor.extractData(url, function(err, data){
        db.articles.find({"title": data.title}, function(err, docs){
            
        });
        //db.articles.insert(data);
    });
}













