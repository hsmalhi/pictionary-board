import React, { useEffect, Fragment } from "react";
import io from "socket.io-client";
import { setup, updatePlayers, startGame, startRound, endRound, endGame, UpdateScoreAction } from '../actions/game';
import { connect } from "react-redux";
import LobbySetup from "./lobby/lobby.component";
import LeftRightDisplay from "./LeftRightDisplay";
import DrawingDisplay from "./DrawingDisplay";
import { Status } from "../../src/models/Game";
import Waiting from "./waiting/waiting.component";
import Title from "./title/title.component";
import CountdownTimer from "./timer/timer.component";
import GuessBoard from "./guessboard/Guessboard.component";
import Result from "./result/result.component";

const mapStateToProps = (state: any) => {
  return {
    code: state.game.code,
    status: state.game.status,
    timer: state.game.timer,
    players: state.game.players,
    leftDrawer: state.game.leftDrawer,
    rightDrawer: state.game.rightDrawer,
    word: state.game.word
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setup: (code: string) => dispatch(setup(code)),
    updatePlayers: (players: any []) => dispatch(updatePlayers(players)),
    startGame: (timer: number, leftDrawer: number, rightDrawer: number, word: string) => dispatch(startGame(timer, leftDrawer, rightDrawer, word)),
    startRound: (timer: number) => dispatch(startRound(timer)),
    endRound: (timer: number, leftDrawer: number, rightDrawer: number, word: string) => dispatch(endRound(timer, leftDrawer, rightDrawer, word)),
    endGame: () => dispatch(endGame()),
    updateScore: (playerId: number) => dispatch(UpdateScoreAction(playerId))
  };
};

const ConnectedGame: React.FC = (props: any) => {
  useEffect(() => {
    const code = window.location.pathname.split("/")[1];
    props.setup(code);
  }, []);

  useEffect(() => {
    props.socket.on("PLAYER_UPDATE", (message: any) => {
      props.updatePlayers(message.players);
    });

    props.socket.on("STARTING_GAME", (message: any) => {
      console.log(props.players);
      props.startGame(message.timer, message.leftDrawer, message.rightDrawer, message.word);
    });

    props.socket.on("ROUND_START", (message: any) => {
      props.startRound(message.timer);
      //TEST: This is testing the scoring aspect. Player id 1 should have a max score at the end of the game.
      if (Number(localStorage.getItem('playerId')) === 1) {
        const message = {
          playerId: 1,
          code: props.code
        }

        props.socket.emit('SCORE', message);
      }
    });

    props.socket.on("ROUND_OVER", (message: any) => {
      props.endRound(message.timer, message.leftDrawer, message.rightDrawer, message.word);
    });

    props.socket.on("GAME_OVER", () => {
      props.endGame();
    });

    props.socket.on("UPDATE_SCORE", (message: any) => {
      props.updateScore(message.playerId);
    });

    return () => {
      props.socket.off("PLAYER_UPDATE");
      props.socket.off("STARTING_GAME");
      props.socket.off("ROUND_START");
      props.socket.off("ROUND_OVER");
      props.socket.off("GAME_OVER");
      props.socket.off("UPDATE_SCORE");
    }
  });

  const beginGame = () => {
    const message = {
      code: props.code
    };
    props.socket.emit("START_GAME", message);
  };

  if (props.status == Status.Lobby) {
    if (Number(localStorage.getItem("playerId")) === 0) {
      return (
        <div>
          {/* <div className="Game">
            <h1>Hello World!</h1>
            <p>Code: {props.code}</p>
            <p>Status: {props.status}</p>
            <p>Timer: {props.timer}</p>
            <p>Players: {props.players.length}</p>
            <p>Left Drawer: {props.leftDrawer}</p>
            <p>Right Drawer: {props.rightDrawer}</p>
            {props.players.length >= 4 && (
              <button onClick={() => beginGame()}> Start Game </button>
            )}
          </div> */}
          <LobbySetup start={() => beginGame()}></LobbySetup>
        </div>
      );
    } else {
      return (
        <Fragment>
          <Title />
          <Waiting message={"waiting for other players to join"} />
        </Fragment>
      );
    }
  } else if (props.status == Status.RoundStarting) {
    if (Number(localStorage.getItem("playerId")) === 0) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"Game is starting soon"} />
          <CountdownTimer startTimeInSeconds={5} timeRemainingInSeconds={5} />
        </Fragment>
      );
    } else if (props.leftDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be drawing!"} />
          <CountdownTimer startTimeInSeconds={5} timeRemainingInSeconds={5} />
        </Fragment>
      );
    } else if (props.rightDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be drawing!"} />
          <CountdownTimer startTimeInSeconds={5} timeRemainingInSeconds={5} />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be guessing!"} />
          <CountdownTimer startTimeInSeconds={5} timeRemainingInSeconds={5} />
        </Fragment>
      );
    }
  } else if (props.status === Status.RoundInProgress) {
    console.log(props);
    if (props.leftDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <DrawingDisplay
          socket={props.socket}
          side="left"
          word={props.word.split(" ")[1]}
          time={45}
        />
      );
    } else if (props.rightDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <DrawingDisplay
          socket={props.socket}
          side="right"
          word={props.word.split(" ")[1]}
          time={45}
        />
      );
    } else if (Number(localStorage.getItem("playerId")) === 0) {
      return <LeftRightDisplay {...props} socket={props.socket} time={45} />;
    } else {
      return <GuessBoard />
    }
  } else if (props.status == Status.RoundOver) {
    if (Number(localStorage.getItem("playerId")) === 0) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"Next round is starting soon"} />
          <CountdownTimer startTimeInSeconds={5} timeRemainingInSeconds={5} />
        </Fragment>
      );
    } else if (props.leftDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be drawing!"} />
          <CountdownTimer startTimeInSeconds={5} timeRemainingInSeconds={5} />
        </Fragment>
      );
    } else if (props.rightDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be drawing!"} />
          <CountdownTimer startTimeInSeconds={5} timeRemainingInSeconds={5} />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be guessing!"} />
          <CountdownTimer startTimeInSeconds={5} timeRemainingInSeconds={5} />
        </Fragment>
      );
    }
  } else if (props.status == Status.GameOver) {
    if (Number(localStorage.getItem("playerId")) === 0) {
      return (
        <Fragment>
          <Title />
          <Result roomcode={props.code} players={props.players}/>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Title />
          <Waiting message={"Thanks for Playing!"} />
        </Fragment>
      );
    }
  } else {
    return (
      <div className="Game">
        <h1>Hello World!</h1>
        <p>Code: {props.code}</p>
        <p>Status: {props.status}</p>
        <p>Timer: {props.timer}</p>
        <p>Players: {props.players.length}</p>
        <p>Left Drawer: {props.leftDrawer}</p>
        <p>Right Drawer: {props.rightDrawer}</p>
        {props.players.length >= 4 && (
          <button onClick={() => beginGame()}> Start Game </button>
        )}
      </div>
    );
  }

  // const renderPlayer = function(player: any) {
  //   return (
  //     <Fragment>
  //       <p>player.id: {player.id}</p>
  //       <p>   player.name: {player.name}</p>
  //       <p>   player.score: {player.score}</p>
  //       <p>   player.correct: {player.correct.toString()}</p>
  //     </Fragment>
  //   )
  // }

  // return (
  //   <div className="Game">
  //     <h1>Hello World!</h1>
  //     <p>Code: {props.code}</p>
  //     <p>Status: {props.status}</p>
  //     <p>Timer: {props.timer}</p>
  //     <p>Players: {props.players.length}</p>
  //     {props.players.map((player: any) => renderPlayer(player))}
  //     <p>Left Drawer: {props.leftDrawer}</p>
  //     <p>Right Drawer: {props.rightDrawer}</p>
  //     <p>Word: {props.word}</p>
  //     {props.players.length >= 4 && <button onClick={() => beginGame()}> Start Game </button>}
  //     <LobbySetup socket={props.socket}></LobbySetup>
  //   </div>
  // );
}

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedGame);

export default Game;
