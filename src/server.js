"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.set("port", process.env.PORT || 3001);
var http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
var io = require("socket.io")(http);
var rooms = {};
var user = [];
io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("playermessage", function () {
        socket.join("player");
    });
    socket.on("playerguess", function (message) {
        io.to("room").emit("playerguess", message);
    });
    socket.on("sign", function (message) {
        var roomName = "" + message.room + message.player;
        socket.join(roomName);
        socket.broadcast.emit('rooms', io.sockets);
    });
    socket.on("coordinates", function (message) {
        var roomName = message.room + "0";
        socket.broadcast.emit("coordinates", message);
    });
    socket.on("clear", function (message) {
        var roomName = message.room + "0";
        socket.emit("clear", message);
    });
    socket.on("stop", function (message) {
        var roomName = message.room + "0";
        socket.emit("stop", message);
    });
});
var server = http.listen(3001, function () {
    console.log("listening on *:3001");
});
