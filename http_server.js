var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/static'));

app.get('/',function (req,res)
{
  res.render('index.ejs');
});

// Generating EJS
app.post('/generate',function (req,res)
{
  var data = {quantity: req.body.quantity, letter: req.body.dropdown};
  res.render('some.ejs',{data: data});

});


var server = app.listen(8089, function ()
{
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
