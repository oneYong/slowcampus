var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongo = require('./mongo/conn');
var admin = require('./routes/admin');
var contacts = require('./routes/contacts');

var app = express();
var port = 3001;

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// 미들웨어 셋팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req,res){
    res.send('first app');
});

// Routing
app.use('/admin', admin);
app.use('/contacts',contacts);

app.listen( port, function(){
    console.log('Express listening on port', port);
});