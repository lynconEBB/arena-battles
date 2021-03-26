const express = require("express");
const app = express();
const http = require('http').createServer(app);
require("./src/backend/sockets.js");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use("/css", express.static(__dirname + "/public/css"));

app.use("/src", express.static(__dirname + "/src"));

http.listen(3000, () => {
    console.log('listening on port 3000');
});

module.exports = http;