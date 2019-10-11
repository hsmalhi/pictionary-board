import React from "react";
import Whiteboard from "../components/Whiteboard/Whiteboard";
import ShowWord from "../components/ShowWord";
import MobileCountdownTimer from "../components/Timer/mobile.timer.component";
import MobileAvatar from "../components/Avatar-list/avatar/mobile.avatar.component";
import { Socket } from "socket.io";

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
