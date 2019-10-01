import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 3001);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);
let rooms: any = {};
let user: any = [];

io.on("connection", function(socket: any) {
  console.log("a user connected");

  socket.on("playermessage", function() {
    socket.join("player");
  });
  socket.on("playerguess", function(message: any) {
    io.to("room").emit("playerguess", message);
  });

  socket.on("sign", function(message: any) {
    let roomName = `${message.room}${message.player}`;
    console.log(roomName);
    socket.join(roomName);
  });

  socket.on("coordinates", function(message: any) {
    let roomName = `${message.room}0`;
    io.to(roomName).emit(`coordinates${message.side}`, message);
  });
  socket.on("clear", function(message: any) {
    let roomName = `${message.room}0`;
    io.to(roomName).emit(`clear${message.side}`, message);
  });
  socket.on("stop", function(message: any) {
    let roomName = `${message.room}0`;
    io.to(roomName).emit(`stop${message.side}`, message);
  });
});

const server = http.listen(3001, function() {
  console.log("listening on *:3001");
});
