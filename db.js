/*------------
  DEPENDENCIES
  ------------*/
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
const path = './db/db.json';

//load the json file into memory
var db = jsonfile.readFileSync(path);

//get DB
app.get('/fullDB', function(req, res){
    res.send(db);
});

//query specific data from the DB
app.get('/query', function(req, res){
    res.send(queryData(req));
});

app.listen(8090, function(){
    console.log('DB running on port 8090');
});

//get user input
rl.on('line', function(input){
    if(input == "save"){
        writeData();
    }else if(input == "write"){
        db.db[2] = "yes";
    }else if(input == "query"){
        console.log(queryData("ye"));
    }
});


/*
  WriteData
  write the version of the db from memory back into db.json
*/


function writeData(){
    console.log("writing to db");
    jsonfile.writeFile(path, db, function(err){
        console.log(err);
    });
}




