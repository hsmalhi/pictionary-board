import React, { Fragment, useEffect } from "react";
import Square from "./square.component";
import Title from "../title/title.component";

import "./lobby.styles.scss";
import { updatePlayers, startGame } from "../../actions/game";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
  return {
      code: state.game.code,
      // status: state.game.status,
      // timer: state.game.timer,
      players: state.game.players
      // leftDrawer: state.game.leftDrawer,
      // rightDrawer: state.game.rightDrawer   
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    // setup: (code: string) => dispatch(setup(code)),
    updatePlayers: (players: any []) => dispatch(updatePlayers(players)),
    startGame: (timer: number, leftDrawer: number, rightDrawer: number, word: string) => dispatch(startGame(timer, leftDrawer, rightDrawer, word)),
    // startRound: (timer: number) => dispatch(startRound(timer)),
    // endRound: (timer: number, leftDrawer: number, rightDrawer: number) => dispatch(endRound(timer, leftDrawer, rightDrawer)),
    // endGame: () => dispatch(endGame())
  };
}

const ConnectedLobbySetup = (props: any) => {
  // const props: any = [
  //   { id: 0, roomcode: "KXY" },
  //   { id: 1, name: "Harjot" },
  //   { id: 2, name: "Ricky" },
  //   { id: 3, name: "Chen" },
  //   { id: 4, name: "Chris" },
  //   { id: 5, name: "Luke" },
  //   { id: 6, name: "Martin" },
  //   { id: 7, name: "Lighthouse" },
  //   { id: 8, name: "Labs" }
  // ];

  // useEffect(() => {
  //   props.socket.on("PLAYER_UPDATE", (message: any) => {
  //     props.updatePlayers(message.players);
  //   });

  //   return () => {
  //     props.socket.off("PLAYER_UPDATE");
  //   }
  // })

  const empty = Array(9 - props.players.length).fill("");

  console.log(props.players);

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
            />
          );
        })}
        {empty.map(() => {
          return <Square />;
        })}
      </div>
    </Fragment>
  );
};

const LobbySetup = connect(mapStateToProps, mapDispatchToProps)(ConnectedLobbySetup);

export default LobbySetup;
