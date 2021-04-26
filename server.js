const express = require("express");
const app = express();
const http = require('http').createServer(app);
const serverSocket = require("socket.io")(http);

const port = Number(process.env.PORT) || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use("/css", express.static(__dirname + "/public/css"));

app.use("/src", express.static(__dirname + "/src"));

http.listen(port, () => {
    console.log('listening on port ' + port);
});

module.exports = serverSocket;

require("./src/backend/gameLoop.js");