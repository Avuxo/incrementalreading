/*------------
  DEPENDENCIES
  ------------*/
const express   = require('express');
const extractor = require('article-extractor');
const bodyParser = require("body-parser");
const http = require('http');
const jsonfile = require('jsonfile');
const fs = require('fs');
const colors = require('colors');
const readline = require('readline');

/*--------------
  INITIALIZATION
  --------------*/
//setup for express app
const app = express();

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

//setup for basic json DB
const path = "./db/db.json";
var db = jsonfile.readFileSync(path);

/*---
  CLI
  ---*/

rl.on('line', function(input){
    if(input == "write"){
        writeDBToFile();
    }else if(input == "back"){
        db.currentArticle -= 1;
    }else if(input == "position"){
        console.log(db.db[db.currentArticle].position);
    }
});


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
    var articleNum = db.currentArticle; //get the currently queued article
    res.send(query(articleNum));
});

/*-------------
  POST REQUESTS
  -------------*/

//user submits articles from add.html here
app.post('/postArticle', function(req, res){
    uploadArticle(req.body.link);
});

app.post('/next', function(req, res){
    console.log("position: " + req.body.pos);
    setArticlePos(db.currentArticle, req.body.pos);
    nextArticleQueue();
});


app.listen(8080, function(){
    console.log('App running on port 8080');
});

/*----------------
  DB communication
  ----------------*/

//autosave DB
setInterval(writeDBToFile, 100000);

function setArticlePos(index, pos){
    if(db.currentArticle + 1 > db.db.length) return;
    db.db[index].position = pos;
    console.log(pos);
}


//write articles to the database
function addArticle(content, title, domain){
    var newArticle = {
        "tag" : db.db.length,
        "article" : content,
        "title" : title,
        "domain": domain,
        "position": 0
    }
    db.db.push(newArticle)
}

//query the database
function query(tag){
    for(var i=0; i<db.db.length; i++){
        if(db.db[i].tag == tag){
            console.log(colors.blue("database querried"));
            return db.db[i]; // removed .article
        }
    }
}

//save the DB based on the one in memory
function writeDBToFile(){
    console.log(colors.yellow("*Writing To File*"));
    jsonfile.writeFile(path, db, function(err){
        console.log(colors.red("db error: " + err));
    });
}

//send the article to the db
function uploadArticle(url){
    extractor.extractData(url, function(err,data){
        /*
          data.content: article body
          data.title  : article title
          data.domain : article source
          data.summary: article summary
          data.author : article author
        */
        addArticle(addAnchors(data.content), data.title, data.domain);
    });
}

//change the article queue counter
function nextArticleQueue(){
    console.log("length:"+  db.db.length);
    console.log("current article: " + db.currentArticle);
    if(db.currentArticle + 1 < db.db.length){
        db.currentArticle = db.currentArticle + 1;
    }else{
        db.currentArticle = 0;
    }
}
