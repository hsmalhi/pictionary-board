import express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import Game from "./models/Game";

const app = express();
app.set("port", process.env.PORT || 3001);

const http = require("http").createServer(app);
const io = require("socket.io").listen(http);

let rooms: Game[] = [];

const generateCode = function(): string{
  var code: string = "";
  var codeGenerated: boolean = false;

  do {
    var characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charactersLength = characters.length;
    for (var i = 0; i < 3; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    codeGenerated = true;
    for (const room of rooms) {
      if ((room.code = code)) {
        codeGenerated = false;
      }
    }
  } while (!codeGenerated);

  return code;
};

// whenever a user connects on port 3001 via
// a websocket, log that a user has connected
// io.on("connection", function(socket: any) {
//   console.log("a user connected");

//   socket.on("SETUP", function() {
//     const roomCode = generateCode();
//     socket.join(roomCode);
//     console.log("New room with code:", roomCode, "created.");
//     socket.emit('ROOM_CODE', roomCode);
//   });
// });

io.on("connection", (socket: any) => {
  console.log("a user connected: ", socket.id);
});

const server = http.listen(3001, function() {
  console.log(`Listening on ${http.address().port}`);
});