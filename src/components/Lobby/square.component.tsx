import React, { Fragment } from "react";
import Avatar from "../Avatar-list/avatar/avatar.component";
import "./lobby.styles.scss";
import "./loadingSpinner.scss";
import StatusMessage from "./StatusMessage";

interface SquareProps {
  id: number | null;
  name: string | null;
  roomcode:string | null;
  start:any | null;
  disabled:any | null;
}


const Square = ({id, name, roomcode, start, disabled,}:SquareProps) => {
  if (id === 0) {
    return (
      <Fragment>
        <div className="box">
          <div>Room Code: {roomcode}</div>
          <button className="start-game-button" onClick={start} disabled={disabled}>Start Game</button>
          {disabled && <StatusMessage>Waiting for more players...</StatusMessage>}
          {!disabled && <StatusMessage>Ready to go! ►</StatusMessage>}
        </div>
      </Fragment>
    );
  } else if (!id || !name) {
    return (
      <Fragment>
        <div className="box">
          Empty
          <div id="loading"></div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div className="box">
        <Avatar id={id} name={null} correct={null} />
        {name}
      </div>
    );
  }
};
export default Square;
