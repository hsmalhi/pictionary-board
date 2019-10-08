import React from "react";
import BoardDisplay from "./BoardDisplay";
import Word from "./Word";
import "../components/styles/GamePage.scss";
import CountdownTimer from "./timer/timer.component";
import { Socket } from "socket.io";
import AvatarList from "./avatar-list/avatarlist.component";
import { connect } from "react-redux";

interface LeftRightDisplayProps {
  word: string;
  time: number;
  side: string;
  socket: Socket;
}

const mapStateToProps = (state: any) => {
  return {
    players: state.game.players,
    leftDrawer: state.game.leftDrawer,
    rightDrawer: state.game.rightDrawer
  };
};

const ConnectedLeftRightDisplay = (props: any) => {
  let leftDrawer = (props.players[props.leftDrawer]['name'])
  let rightDrawer = (props.players[props.rightDrawer]['name'])


  return (
    <div className="game-page">
      <div className="game-page-flex">
        <div className="word-container">
          <Word word={props.word} />
        </div>
        {!props.skip && <CountdownTimer
          startTimeInSeconds={props.time}
          timeRemainingInSeconds={props.time}
        />}
        {props.skip && <p>Next Round Starting Soon...</p>}
        <div className="drawer-name-left"> {leftDrawer}</div>
        <div className="drawer-name-right">{rightDrawer}</div>
        <div className="canvas-container">
          <BoardDisplay side="left" socket={props.socket}></BoardDisplay>
          <BoardDisplay side="right" socket={props.socket}></BoardDisplay>
        </div>
        <div className="avatarlist-container">
          <AvatarList />
        </div>
      </div>
    </div>
  );
};

const LeftRightDisplay = connect(mapStateToProps)(ConnectedLeftRightDisplay);

export default LeftRightDisplay;
