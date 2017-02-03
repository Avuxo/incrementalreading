const express = require('express');
const fs = require('fs');
const app = express();

var db = require('./db/db.json');

app.get('/find', function(req, res){
    
});


app.listen(8090, function(){
    console.log('App running on port 8090');
});

