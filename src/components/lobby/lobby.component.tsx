import React, { Fragment } from "react";
import Square from "./square.component";
import Title from "../title/title.component";

import "./lobby.styles.scss";
import { connect } from "react-redux";



const mapStateToProps = (state: any) => {
  return {
      code: state.game.code,
      players: state.game.players   
  };
}

const ConnectedLobbySetup = (props: any) => {

  const empty = Array(9 - props.players.length).fill("");

  return (
    <Fragment>
      <Title />
      <div className="game-board">
        {props.players.map((player: any) => {
          return (
            <Square
              id={player.id}
              name={player.name}
              roomcode={props.code}
              start={props.start}
              disabled={props.players.length<4}
            />
          );
        })}
        {empty.map(() => {
          return <Square id={null} name={null} roomcode={null} start={null} disabled={null} />;
        })}
      </div>
    </Fragment>
  );
};

const LobbySetup = connect(mapStateToProps)(ConnectedLobbySetup);

export default LobbySetup;
