var express = require('express');
var ejs = require('ejs');
var io = require('socket.io');

var app = module.exports = express.createServer();

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});
app.set('view engine', 'ejs');
app.set('view options', { layout: false });

app.get('/', function(req, res) {
    console.log('/');
    res.render('index');
});

io = io.listen(app);
io.configure('production', function() {
  io.set('transports', ['websocket']);
});

io.sockets.on('connection', function (socket) {
  console.log('connected');
  socket.on('msg send', function (msg) {
    socket.emit('msg push', msg);
    socket.broadcast.emit('msg push', msg);
  });
  socket.on('disconnect', function() {
    console.log('disconnected');
  });
});

app.listen(8080);
