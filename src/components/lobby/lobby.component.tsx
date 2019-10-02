import React, { Fragment } from "react";

import "./lobby.styles.scss";

const LobbySetup = () => {
  return (
    <Fragment>
      <div className="game-board">
        <div className="box">X</div>
        <div className="box">O</div>
        <div className="box">O</div>
        <div className="box">O</div>
        <div className="box">X</div>
        <div className="box">O</div>
        <div className="box">O</div>
        <div className="box">X</div>
        <div className="box">X</div>
      </div>
    </Fragment>
  );
}
export default LobbySetup;