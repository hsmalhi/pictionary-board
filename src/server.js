"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.set("port", process.env.PORT || 3001);
var http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
var io = require("socket.io")(http);
var user = [];
// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function (socket) {
    user.push(socket.id);
    console.log("a user connected");
    socket.on("lobbymessage", function (message) {
        socket.join("leader");
        console.log("the lobby has spoken " + message);
    });
    socket.on("coordinates", function (message) {
        io.to("leader").emit("coordinates1", message);
    });
    socket.on("clear", function (message) {
        io.to("leader").emit("clear", message);
    });
    socket.on("stop", function (message) {
        io.to("leader").emit("stop", message);
    });
});
var server = http.listen(3001, function () {
    console.log("listening on *:3001");
});
