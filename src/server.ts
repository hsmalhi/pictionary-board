import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 3001);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
  console.log("a user connected");
  socket.join("lobby");

  socket.on("coordinates", function(message: any) {
    io.to("leader").emit("coordinates1", message);
  });
  socket.on("clear", function(message: any) {
    io.to("leader").emit(message);
  });
  socket.on("stop", function(message: any) {
    console.log("message");
    io.to("leader").emit(message);
  });
  socket.on("lobbymessage", function(message: any) {
    socket.join("leader");
    console.log(`the lobby has spoken ${message}`);
  });
});

const server = http.listen(3001, function() {
  console.log("listening on *:3001");
});
