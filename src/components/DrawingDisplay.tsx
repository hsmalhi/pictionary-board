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
}

const DrawingDisplay = (props: DrawingDisplayProps) => {
  return (
    <div className="whiteboard-display">
      <ShowWord word={props.word} />
      <MobileCountdownTimer
        startTimeInSeconds={props.time}
        timeRemainingInSeconds={props.time}
      />
      <div className="mAvatar">
        <MobileAvatar id="1" />
      </div>
      {/* <div className="mName" >Placeholder</div> */}
      <Whiteboard side={props.side} socket={props.socket} />
    </div>
  );
};

export default DrawingDisplay;
