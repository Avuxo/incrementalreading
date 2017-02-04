/*
  DEPENDENCIES
              */
const express = require('express');
const fs = require('fs');
const jsonfile = require('jsonfile');
const readline = require('readline');

const app = express();
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

//filepath for database
const path = './db/db.json'

//load the json file into memory
var db = require(path);

app.listen(8090, function(){
    console.log('App running on port 8090');
});

//get user input
rl.on('line', function(input){
    if(input == "save"){
        writeData();
    }
})


/*
  WriteData
  write the version of the db from memory back into db.json
*/
function writeData(){
    console.log("writing to db")
    jsonfile.writeFile(path, db, function(err){
        console.log(err);
    });
}





