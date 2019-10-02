import React, { Fragment } from "react";
import Square from "./square.component";

import "./lobby.styles.scss";

const LobbySetup = () => {
  return (
    <Fragment>
      <div className="game-board">
        <Square/>
        <div className="box">Spot</div>
        <div className="box">Spot</div>
        <div className="box">Spot</div>
        <div className="box">Spot</div>
        <div className="box">room code</div>
        <div className="box">Spot</div>
        <div className="box">Spot</div>
        <div className="box">Spot</div>
        <div className="box">Spot</div>
      </div>
    </Fragment>
  );
}
export default LobbySetup;