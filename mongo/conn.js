//MongoDB 접속
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('mongodb connect');
});

var connect = mongoose.connect('mongodb://10.185.8.241:27017/fastcampus', { useMongoClient: true });
autoIncrement.initialize(connect);