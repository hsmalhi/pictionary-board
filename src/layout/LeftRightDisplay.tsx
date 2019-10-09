import React from "react";
import BoardDisplay from "../components/LeftRightDisplay/BoardDisplay"
import Word from "../components/LeftRightDisplay/Word/Word";
import "../components/Styles/GamePage.scss";
import CountdownTimer from "../components/Timer/timer.component";
import AvatarList from "../components/Avatar-list/avatarlist.component";
import { connect } from "react-redux";



const mapStateToProps = (state: { game: { players: any; leftDrawer: number; rightDrawer: number; }; }) => {
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
        <CountdownTimer
          startTimeInSeconds={props.time}
          timeRemainingInSeconds={props.time}
        /> <div className="drawer-name-left"> {leftDrawer}</div>
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
