import React, { useEffect } from 'react';
import io from "socket.io-client";
import { setup, updatePlayers } from '../actions/game';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return {
      code: state.game.code,
      status: state.game.status,
      timer: state.game.timer,
      players: state.game.players   
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setup: (code: string) => dispatch(setup(code)),
    updatePlayers: (players: any []) => dispatch(updatePlayers(players))
  };
}


const ConnectedGame: React.FC = (props:any) => {

  useEffect(() => {
    const code = window.location.pathname.split("/")[1];
    props.setup(code);
  }, []); 

  props.socket.on("PLAYER_UPDATE", (message: any) => {
    props.updatePlayers(message.players);
  });

  return (
    <div className="Game">
      <h1>Hello World!</h1>
      <p>Code: {props.code}</p>
      <p>Status: {props.status}</p>
      <p>Timer: {props.timer}</p>
      <p>Players: {props.players.length}</p>
    </div>
  );
}

const Game = connect(mapStateToProps, mapDispatchToProps)(ConnectedGame);

export default Game;
