var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');

// Chargement de la page index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

    socket.on('drapeau_jaune', function () {
        socket.broadcast.emit('drapeau_jaune', {});
    }); 

    socket.on('drapeau_bleu', function () {
        socket.broadcast.emit('drapeau_bleu', {});
    }); 

    socket.on('drapeau_noir', function (num) {
        num = ent.encode(num);
        socket.broadcast.emit('drapeau_noir', {num: num});
    }); 
});

server.listen(8080);