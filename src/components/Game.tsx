import React, { useEffect, Fragment } from "react";
import io from "socket.io-client";
import { setup, updatePlayers, startGame, startRound, endRound, endGame, updateScore, restart } from '../actions/game';
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
    updateScore: (playerId: number) => dispatch(updateScore(playerId)),
    restart: () => dispatch(restart())
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
    });

    props.socket.on("ROUND_OVER", (message: any) => {
      console.log("ending round");
      console.log(message);
      props.endRound(message.timer, message.leftDrawer, message.rightDrawer, message.word);
      console.log("ended round");
    });

    props.socket.on("GAME_OVER", () => {
      props.endGame();
    });

    props.socket.on("UPDATE_SCORE", (message: any) => {
      props.updateScore(message.playerId);
    });

    props.socket.on("RESTART_CLIENT", () => {
      props.restart();
    });

    return () => {
      props.socket.off("PLAYER_UPDATE");
      props.socket.off("STARTING_GAME");
      props.socket.off("ROUND_START");
      props.socket.off("ROUND_OVER");
      props.socket.off("GAME_OVER");
      props.socket.off("UPDATE_SCORE");
      props.socket.off("RESTART_CLIENT");
    }
  });

  const beginGame = () => {
    const message = {
      code: props.code
    };
    props.socket.emit("START_GAME", message);
  };

  const restart = () => {
    const message = {
      code: props.code
    };
    props.socket.emit("RESTART_SERVER", message);
  };

  const score = () => {
    const guesserMessage = {
      playerId: localStorage.getItem('playerId'),
      code: props.code
    }

    props.socket.emit('SCORE', guesserMessage);

    const leftDrawerMessage = {
      playerId: props.leftDrawer,
      code: props.code
    }

    props.socket.emit('SCORE', leftDrawerMessage);

    const rightDrawerMessage = {
      playerId: props.rightDrawer,
      code: props.code
    }

    props.socket.emit('SCORE', rightDrawerMessage);
  }

  if (props.status == Status.Lobby) {
    if (Number(localStorage.getItem("playerId")) === 0) {
      return (
        <div>
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
    if (props.leftDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <DrawingDisplay
          socket={props.socket}
          side="left"
          word={props.word.split(" ")[0]}
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
      return <LeftRightDisplay {...props} socket={props.socket} word={props.word} time={45} />;
    } else {
      return <GuessBoard word={props.word} onCorrect={() => score()}/>
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
          <Result roomcode={props.code} players={props.players} restart={() => restart()}/>
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
}

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedGame);

export default Game;
