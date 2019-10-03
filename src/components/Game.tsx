import React, { useEffect } from 'react';
import io from "socket.io-client";
import { setup, updatePlayers, startGame, startRound, endRound, endGame } from '../actions/game';
import { connect } from 'react-redux';
import LobbySetup from './lobby/lobby.component';

const mapStateToProps = (state: any) => {
  return {
      code: state.game.code,
      status: state.game.status,
      timer: state.game.timer,
      players: state.game.players,
      leftDrawer: state.game.leftDrawer,
      rightDrawer: state.game.rightDrawer   
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setup: (code: string) => dispatch(setup(code)),
    updatePlayers: (players: any []) => dispatch(updatePlayers(players)),
    startGame: (timer: number, leftDrawer: number, rightDrawer: number) => dispatch(startGame(timer, leftDrawer, rightDrawer)),
    startRound: (timer: number) => dispatch(startRound(timer)),
    endRound: (timer: number, leftDrawer: number, rightDrawer: number) => dispatch(endRound(timer, leftDrawer, rightDrawer)),
    endGame: () => dispatch(endGame())
  };
}

const ConnectedGame: React.FC = (props:any) => {
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
    }
  });

  const beginGame = () => {
    const message = {
      code: props.code
    }
    props.socket.emit("START_GAME", message);
  }

  return (
    <div className="Game">
      {/* <h1>Hello World!</h1>
      <p>Code: {props.code}</p>
      <p>Status: {props.status}</p>
      <p>Timer: {props.timer}</p>
      <p>Players: {props.players.length}</p>
      <p>Left Drawer: {props.leftDrawer}</p>
      <p>Right Drawer: {props.rightDrawer}</p>
      {props.players.length >= 4 && <button onClick={() => beginGame()}> Start Game </button>} */}
      <LobbySetup socket={props.socket}></LobbySetup>
    </div>
  );
}

const Game = connect(mapStateToProps, mapDispatchToProps)(ConnectedGame);

export default Game;
