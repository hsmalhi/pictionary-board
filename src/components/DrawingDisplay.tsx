import React from "react";
import Whiteboard from "./whiteboard/Whiteboard";
import ShowWord from "./ShowWord";
import MobileCountdownTimer from "./timer/mobile.timer.component";
import { Socket } from "socket.io";
import MobileAvatar from "./avatar-list/avatar/mobile.avatar.component";

interface DrawingDisplayProps {
  word: string;
  time: number;
  side: string;
  socket: Socket;
  id: number;
}

const DrawingDisplay = (props: DrawingDisplayProps) => {


  return (
    <div className="whiteboard-display disable-dbl-tap-zoom">
      <ShowWord word={props.word} />
      <MobileCountdownTimer
        startTimeInSeconds={props.time}
        timeRemainingInSeconds={props.time}
      />
      <div className="mAvatar">
        <MobileAvatar id={props.id} />
      </div>
      <Whiteboard side={props.side} socket={props.socket} />
    </div>
  );
};

export default DrawingDisplay;
