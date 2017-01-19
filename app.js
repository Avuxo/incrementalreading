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
const db  = mongojs('https://localhost:27017/test', ['users']); 


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
    extractor.extractData(webpages[0], function(err, data){
        res.send(data);
    })
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





