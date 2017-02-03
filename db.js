/*
  DEPENDENCIES
              */
const express = require('express');
const fs = require('fs');
const jsonfile = require('jsonfile');

const app = express();

//filepath for database
const path = './db/db.json'

//load the json file into memory
var db = require(path);

app.listen(8090, function(){
    console.log('App running on port 8090');
});

/*
  WriteData
  write the version of the db from memory back into db.json
*/
function writeData(){
    jsonfile.writeFile(path, db, function(err){
        console.log(err);
    });
}





