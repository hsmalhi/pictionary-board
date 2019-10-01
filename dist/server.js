"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 3001);
let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./src/pages/bigscreen.html"));
});
// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("message", function(message) {
    console.log(socket);
    console.log(message);

  });
});
const server = http.listen(3001, function() {
  console.log("listening on *:3001");
  
});
console.log("hi");
//# sourceMappingURL=server.js.map
