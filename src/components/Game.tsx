import React, { useEffect } from "react";
import io from "socket.io-client";
import {
  setup,
  updatePlayers,
  startGame,
  startRound,
  endRound,
  endGame
} from "../actions/game";
import { connect } from "react-redux";
import LobbySetup from "./lobby/lobby.component";
import LeftRightDisplay from "./LeftRightDisplay";
import DrawingDisplay from "./DrawingDisplay";
import { Status } from "../../src/models/Game";
// import Game, { Status, Role } from '../models/Game'

const mapStateToProps = (state: any) => {
  return {
    code: state.game.code,
    status: state.game.status,
    timer: state.game.timer,
    players: state.game.players,
    leftDrawer: state.game.leftDrawer,
    rightDrawer: state.game.rightDrawer
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setup: (code: string) => dispatch(setup(code)),
    updatePlayers: (players: any[]) => dispatch(updatePlayers(players)),
    startGame: (timer: number, leftDrawer: number, rightDrawer: number) =>
      dispatch(startGame(timer, leftDrawer, rightDrawer)),
    startRound: (timer: number) => dispatch(startRound(timer)),
    endRound: (timer: number, leftDrawer: number, rightDrawer: number) =>
      dispatch(endRound(timer, leftDrawer, rightDrawer)),
    endGame: () => dispatch(endGame())
  };
};

const ConnectedGame: React.FC = (props: any) => {
  useEffect(() => {
    const code = window.location.pathname.split("/")[1];
    props.setup(code);
  }, []);

  useEffect(() => {
    props.socket.on("PLAYER_UPDATE", (message: any) => {
      props.updatePlayers(message.players);
    });

    props.socket.on("STARTING_GAME", (message: any) => {
      props.startGame(message.timer, message.leftDrawer, message.rightDrawer);
    });

    props.socket.on("ROUND_START", (message: any) => {
      props.startRound(message.timer);
    });

    props.socket.on("ROUND_OVER", (message: any) => {
      props.endRound(message.timer, message.leftDrawer, message.rightDrawer);
    });

    props.socket.on("GAME_OVER", () => {
      props.endGame();
    });

    return () => {
      props.socket.off("PLAYER_UPDATE");
      props.socket.off("STARTING_GAME");
      props.socket.off("ROUND_START");
      props.socket.off("ROUND_OVER");
      props.socket.off("GAME_OVER");
    };
  });

  const beginGame = () => {
    const message = {
      code: props.code
    };
    props.socket.emit("START_GAME", message);
  };

  if (props.status == Status.Lobby) {
    return (
      <div>
        <div className="Game">
          <h1>Hello World!</h1>
          <p>Code: {props.code}</p>
          <p>Status: {props.status}</p>
          <p>Timer: {props.timer}</p>
          <p>Players: {props.players.length}</p>
          <p>Left Drawer: {props.leftDrawer}</p>
          <p>Right Drawer: {props.rightDrawer}</p>
          {props.players.length >= 4 && (
            <button onClick={() => beginGame()}> Start Game </button>
          )}
        </div>
        <LobbySetup socket={props.socket}></LobbySetup>
      </div>
    );
  } else if (props.status === Status.RoundInProgress) {
    if (props.leftDrawer === Number(localStorage.getItem('playerId'))) {
      return <DrawingDisplay socket={props.socket} side="left" />;
    } else if (props.rightDrawer === Number(localStorage.getItem('playerId'))) {
      return <DrawingDisplay socket={props.socket} side="right" />;
    } else if (Number(localStorage.getItem('playerId')) === 0) {
      return <LeftRightDisplay {...props} socket={props.socket} />;
    } else {
      return (
        <div className="Game">
          <h1>Hello World!</h1>
          <p>Code: {props.code}</p>
          <p>Status: {props.status}</p>
          <p>Timer: {props.timer}</p>
          <p>Players: {props.players.length}</p>
          <p>Left Drawer: {props.leftDrawer}</p>
          <p>Right Drawer: {props.rightDrawer}</p>
          {props.players.length >= 4 && (
            <button onClick={() => beginGame()}> Start Game </button>
          )}
        </div>
      );
    } 
  } else {
    return (
      <div className="Game">
        <h1>Hello World!</h1>
        <p>Code: {props.code}</p>
        <p>Status: {props.status}</p>
        <p>Timer: {props.timer}</p>
        <p>Players: {props.players.length}</p>
        <p>Left Drawer: {props.leftDrawer}</p>
        <p>Right Drawer: {props.rightDrawer}</p>
        {props.players.length >= 4 && (
          <button onClick={() => beginGame()}> Start Game </button>
        )}
      </div>
    );
  }

  // if (props.status == Status.RoundInProgress && props.leftDrawer === Number(localStorage.getItem("playerId"))) {
  //   return <DrawingDisplay socket={props.socket} side="left" />;
  // } else if (props.status == Status.RoundInProgress && props.rightDrawer === Number(localStorage.getItem("playerId"))) {
  //   return <DrawingDisplay socket={props.socket} side="right" />;
  // } else if (props.status == Status.RoundInProgress) {
  //   return (
  //     <div className="Game">
  //       <h1>Hello World!</h1>
  //       <p>Code: {props.code}</p>
  //       <p>Status: {props.status}</p>
  //       <p>Timer: {props.timer}</p>
  //       <p>Players: {props.players.length}</p>
  //       <p>Left Drawer: {props.leftDrawer}</p>
  //       <p>Right Drawer: {props.rightDrawer}</p>
  //       {props.players.length >= 4 && (
  //         <button onClick={() => beginGame()}> Start Game </button>
  //       )}
  //     </div>
  //   );
  // } else if (
  //   props.status == Status.RoundInProgress &&
  //   Number(localStorage.getItem("playerID")) === 0
  // ) {
  //   return <LeftRightDisplay {...props} socket={props.socket} />;
  // }

  // return (
  //   <div className="Game">
  //     <h1>Hello World!</h1>
  //     <p>Code: {props.code}</p>
  //     <p>Status: {props.status}</p>
  //     <p>Timer: {props.timer}</p>
  //     <p>Players: {props.players.length}</p>
  //     <p>Left Drawer: {props.leftDrawer}</p>
  //     <p>Right Drawer: {props.rightDrawer}</p>
  //     {props.players.length >= 4 && (
  //       <button onClick={() => beginGame()}> Start Game </button>
  //     )}
  //   </div>
  // );
};

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedGame);

export default Game;
