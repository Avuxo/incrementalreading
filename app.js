/*------------
  DEPENDENCIES
  ------------*/
const express = require('express');
const mongojs = require('mongojs');

/*--------------
  INITIALIZATION
  --------------*/

const app = express();



app.use('/static', express.static(__dirname + '/public'));

/*---------
  WEB PAGES
  ---------*/
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});


app.listen(8080, function(){
    console.log('App running on port 8080');
});





