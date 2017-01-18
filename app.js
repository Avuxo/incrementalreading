/*------------
  DEPENDENCIES
  ------------*/
const express = require('express');
const mongojs = require('mongojs');

/*--------------
  INITIALIZATION
  --------------*/

const app = express();
var db = mongojs('https://localhost:27017/test', ['users']);


app.use('/static', express.static(__dirname + '/public'));

/*---------
  WEB PAGES
  ---------*/

//index
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});



//GET request for article
app.get('/article', function(req, res){
    res.send({title:'title'});
})

app.listen(8080, function(){
    console.log('App running on port 8080');
});






