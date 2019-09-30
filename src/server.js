"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.set("port", process.env.PORT || 3001);
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var rooms = [];
var generateCode = function () {
    var code = "";
    var codeGenerated = false;
    do {
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var charactersLength = characters.length;
        for (var i = 0; i < 3; i++) {
            code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        codeGenerated = true;
        for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
            var room = rooms_1[_i];
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
io.on("connection", function (socket) {
    console.log("a user connected: ", socket.id);
});
var server = http.listen(3001, function () {
    console.log("Listening on " + http.address().port);
});
