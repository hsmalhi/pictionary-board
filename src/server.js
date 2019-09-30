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
    socket.on("playermessage", function () {
        socket.join("player");
    });
    socket.on("playerguess", function (message) {
        io.to("room").emit("playerguess", message);
    });
    socket.on("sign", function (message) {
        var roomName = "" + message.room + message.player;
        console.log(roomName);
        socket.join(message.roomName);
    });
    socket.on("coordinates", function (message) {
        io.to("room").emit("coordinates1", message);
    });
    socket.on("clear", function (message) {
        io.to("room").emit("clear", message);
    });
    socket.on("stop", function (message) {
        io.to("room").emit("stop", message);
    });
});
var server = http.listen(3001, function () {
    console.log("listening on *:3001");
});
