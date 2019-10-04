import React from "react";
import Whiteboard from "./whiteboard/Whiteboard";
import ShowWord from "./ShowWord";
import CountdownTimer from "./timer/timer.component";
import { Socket } from "socket.io";


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
      <CountdownTimer startTimeInSeconds={props.time} timeRemainingInSeconds={props.time}/>
      <Whiteboard side={props.side} socket={props.socket} />
    </div>
  );
};

export default DrawingDisplay;
