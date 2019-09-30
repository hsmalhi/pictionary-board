import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 3001);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

let user: any = [];

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
  user.push(socket.id);
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
    socket.join(message.roomName);
  });
  socket.on("coordinates", function(message: any) {
    io.to("room").emit("coordinates1", message);
  });
  socket.on("clear", function(message: any) {
    io.to("room").emit("clear", message);
  });
  socket.on("stop", function(message: any) {
    io.to("room").emit("stop", message);
  });
});

const server = http.listen(3001, function() {
  console.log("listening on *:3001");
});
