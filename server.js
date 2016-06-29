var express = require ('express');
var bodyParser = require('body-parser');
var app = express ();
var config = require ('./utenti.json');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/Database';
var elementiJson = 2;


app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

app.get ('/' , function (req , res){

  res.render('login');

});

app.post ('/welcome' , function (req , res){

  var exit = 0;
  var cont = 0;

  var response = {
    mail : req.body.mail,
    password : req.body.password
  };

  while ((cont < elementiJson) && (exit == 0)){
    if ((config[cont].mail == response.mail) && (config[cont].password == response.password)){

      res.render('index', {
        nome: config[cont].nome,
        cognome: config[cont].cognome,
      });
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

app.post('/send', function(req, res){

  MongoClient.connect(url, function(err, db){
    if (err) {
      console.log('Impossibile connettersi al database di mongoDB, Errore: ',err);
      }
    else {
      console.log('Connessi a ',url);
      let collection = db.collection('elementi');

      /*let arrayElementi = [];
      arrayElementi.push(req.body.elem);*/

      collection.insert(req.body.elem, function(err, result){
      if (err) {
          console.log(err);
        }
        else {
          console.log('I documenti inseriti sono:',result);
        }
      });
    }
  });
});

var server = app.listen (8081 , function (){

  var host = server.address().address;
  var port = server.address().port;

  console.log ("Connessi su http://%s%s",host,port);

});
