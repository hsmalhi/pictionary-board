import React from "react";
import BoardDisplay from "./BoardDisplay";
import Word from "./Word"
import "../components/styles/GamePage.scss"
import CountdownTimer from "./timer/timer.component";
import { Socket } from "socket.io";


interface LeftRightDisplayProps {
  word: string;
  time: number;
  side: string;
  socket: Socket;
}


const LeftRightDisplay  = (props : LeftRightDisplayProps) => {

  return (
    <div className="game-page">
      <div className="flex">
        <Word word="Battle Ship"/>
        <CountdownTimer startTimeInSeconds={props.time} timeRemainingInSeconds={props.time}/>
      <BoardDisplay side="left" socket={props.socket} ></BoardDisplay>
      <BoardDisplay side="right" socket={props.socket} ></BoardDisplay>
      </div>
      </div>
  );
};

export default LeftRightDisplay;
