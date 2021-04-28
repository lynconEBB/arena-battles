const express = require("express");
const app = express();
const http = require('http').createServer(app);
const serverSocket = require("socket.io")(http);

const port = Number(process.env.PORT) || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/pages/mainPage.html');
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/public/pages/gamePage.html');
});

app.use("/", express.static(__dirname + "/public"));

module.exports = serverSocket;

http.listen(port, () => {
    console.log('listening on port ' + port);
});

require("./src/backend/gameLoop.js");