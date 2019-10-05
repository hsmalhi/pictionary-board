import React from "react";
import BoardDisplay from "./BoardDisplay";
import Word from "./Word";
import "../components/styles/GamePage.scss";
import CountdownTimer from "./timer/timer.component";
import { Socket } from "socket.io";
import AvatarList from "./avatar-list/avatarlist.component";

interface LeftRightDisplayProps {
  word: string;
  time: number;
  side: string;
  socket: Socket;
}

const LeftRightDisplay = (props: LeftRightDisplayProps) => {
  return (
    <div className="game-page">
      <div className="game-page-flex">
        <div className="avatarlist-container">
          <AvatarList />
        </div>

        <div className="word-container">
          <Word word={props.word} />
        </div>
        <CountdownTimer
          startTimeInSeconds={props.time}
          timeRemainingInSeconds={props.time}
        />
        <div className="canvas-container">
          <BoardDisplay side="left" socket={props.socket}></BoardDisplay>
          <BoardDisplay side="right" socket={props.socket}></BoardDisplay>
        </div>
      </div>
    </div>
  );
};

export default LeftRightDisplay;
