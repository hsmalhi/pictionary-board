import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer, { initialState } from "../reducers/game"
import io from "socket.io-client";

const store = createStore(reducer, initialState);

const socket: any = io("http://localhost:3001");

const Game: React.FC = () => {
  socket.on('connect', (socket: any) => {
    // socket.emit("SETUP");

    console.log("here");

    // socket.on("ROOM_CODE", function(roomCode: string) {
    //   console.log(roomCode);
    // });
  });

  return (
    <Provider store={store}>
      <div className="Game">
        <h1>{store.getState().game.players}</h1>
      </div>
    </Provider>
  );
}

export default Game;