var express = require ("express");
var app = express ();
var config = require ("./utenti.json");
var elementiJson = 2;

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get ('/' , function (req , res){

  res.render('login.jade');

});

app.get ('/welcome' , function (req , res){

  var exit = 0;
  var cont = 0;

  var response = {
    mail : req.query.mail,
    password : req.query.password
  };

  while ((cont < elementiJson) && (exit == 0)){
    if ((config[cont].mail == response.mail) && (config[cont].password == response.password)){
      let someData = {message: 'hi'};
      res.render('index.jade');
      exit++;
      cont = 0;
    }
    else {
      cont ++;
    }
  }

  if (exit == 0){
    console.log ("ERRORE");
    res.end ("ERRORE , i tuoi dati non sono presenti nel database");
  }
});

var server = app.listen (8081 , function (){

  var host = server.address().address;
  var port = server.address().port;

  console.log ("Connessi su http://%s%s",host,port);

});
