import React from 'react';
import io from "socket.io-client";
import { setup } from '../actions/game';
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
    setup: (code: string) => dispatch(setup(code))
  };
}

// const socket: any = io.connect("http://localhost:3001");

const ConnectedGame: React.FC = (props:any) => {
  // props.socket.emit("SETUP");

  // props.socket.on("connect", () => {
  //   props.socket.emit("SETUP");
  // })

  props.socket.on("ROOM_CREATED", (message: any) => {
    props.setup(message.code);
  })

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
