import React, { Fragment } from "react";
import Avatar from "../avatar-list/avatar/avatar.component";
import "./lobby.styles.scss";
import "./loadingSpinner.scss";
import StatusMessage from "./StatusMessage";

const Square = (props: any) => {
  if (props.id === 0) {
    return (
      <Fragment>
        <div className="box">
          <div>Room Code: {props.roomcode}</div>
          <button className="start-game-button" onClick={props.start} disabled={props.disabled}>Start Game</button>
          {props.disabled && <StatusMessage>Waiting for more players...</StatusMessage>}
          {!props.disabled && <StatusMessage>Ready to go! ►</StatusMessage>}
        </div>
      </Fragment>
    );
  } else if (!props.id || !props.name) {
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
        <Avatar id={props.id} />
        {props.name}
      </div>
    );
  }
};
export default Square;
