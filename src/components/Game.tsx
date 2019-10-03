import React, { useEffect } from 'react';
import io from "socket.io-client";
import { setup, updatePlayers, startGame, startRound } from '../actions/game';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return {
      code: state.game.code,
      status: state.game.status,
      timer: state.game.timer,
      players: state.game.players   
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setup: (code: string) => dispatch(setup(code)),
    updatePlayers: (players: any []) => dispatch(updatePlayers(players)),
    startGame: (timer: number) => dispatch(startGame(timer)),
    startRound: (timer: number) => dispatch(startRound(timer))
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
      props.startGame(message.timer);
    });
  
    props.socket.on("ROUND_START", (message: any) => {
      props.startRound()
    });

    return () => {
      props.socket.off("PLAYER_UPDATE");
      props.socket.off("STARTING_GAME");
      props.socket.off("ROUND_START");
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
      <h1>Hello World!</h1>
      <p>Code: {props.code}</p>
      <p>Status: {props.status}</p>
      <p>Timer: {props.timer}</p>
      <p>Players: {props.players.length}</p>
      {props.players.length >= 4 && <button onClick={() => beginGame()}> Start Game </button>}
    </div>
  );
}

const Game = connect(mapStateToProps, mapDispatchToProps)(ConnectedGame);

export default Game;
