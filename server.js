const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require("socket.io")(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use("/css", express.static(__dirname + "/public/css"));

app.use("/src", express.static(__dirname + "/src"));

http.listen(3000, () => {
    console.log('listening on port 3000');
});

io.on('connection', (socket) => {
    console.log("OLA");
    socket.test = "Ola Mundo";

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

});

module.exports = io;