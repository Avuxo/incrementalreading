/*------------
  DEPENDENCIES
  ------------*/
const express   = require('express');
const mongojs   = require('mongojs');
const extractor = require('article-extractor');

/*--------------
  INITIALIZATION
  --------------*/

const app = express();
const db  = mongojs('localhost:27017/test', ['users', 'articles']); 


/*-----
  SETUP
  -----*/

app.use('/static', express.static(__dirname + '/public'));

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
    //res.send(getArticle(0))
    console.log(req);
});

/*-------------
  POST REQUESTS
  -------------*/

app.post('/postArticle', function(req, res){
    console.log(req.body);
});


app.listen(8080, function(){
    console.log('App running on port 8080');
});



/*----------------
  DB communication
  ----------------*/

//send the article to the db
function uploadArticle(url){
    extractor.extractData(url, function(err, data){
        db.articles.insert(data);
    });
}

function getArticle(index){
    db.articles.find(function(err, docs){
        console.log(docs[index]);
        return(docs[index]);
    });
}

