import React, { useEffect, Fragment } from "react";
import io from "socket.io-client";
import {
  setup,
  updatePlayers,
  startGame,
  startRound,
  endRound,
  endGame,
  updateScore,
  restart
} from "../actions/game";
import { connect } from "react-redux";
import LobbySetup from "./lobby/lobby.component";
import LeftRightDisplay from "./LeftRightDisplay";
import DrawingDisplay from "./DrawingDisplay";
import { Status } from "../../src/models/Game";
import Waiting from "./waiting/waiting.component";
import Title from "./title/title.component";
import GuessBoard from "./guessboard/Guessboard.component";
import Result from "./result/result.component";
import CenterCountdownTimer from "./timer/center.time.component";
import CorrectDisplay from "./CorrectDisplay";

document.ontouchmove = function(event) {
  event.preventDefault();
};

// window.onbeforeunload = function() {
//     event.preventDefault();
//     this.alert("you are leaving the page?");
// };

window.addEventListener("beforeunload", event => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = "you are leaving the page";
});

const mapStateToProps = (state: any) => {
  return {
    code: state.game.code,
    status: state.game.status,
    timer: state.game.timer,
    players: state.game.players,
    leftDrawer: state.game.leftDrawer,
    rightDrawer: state.game.rightDrawer,
    word: state.game.word,
    prevWord: state.game.prevWord
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setup: (code: string) => dispatch(setup(code)),
    updatePlayers: (players: any[]) => dispatch(updatePlayers(players)),
    startGame: (
      timer: number,
      leftDrawer: number,
      rightDrawer: number,
      word: string
    ) => dispatch(startGame(timer, leftDrawer, rightDrawer, word)),
    startRound: (timer: number) => dispatch(startRound(timer)),
    endRound: (
      timer: number,
      leftDrawer: number,
      rightDrawer: number,
      word: string
    ) => dispatch(endRound(timer, leftDrawer, rightDrawer, word)),
    endGame: () => dispatch(endGame()),
    updateScore: (playerId: number, points: number) => dispatch(updateScore(playerId, points)),
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
      props.startGame(message.timer, message.leftDrawer, message.rightDrawer, message.word);
    });

    props.socket.on("ROUND_START", (message: any) => {
      props.startRound(message.timer);
    });

    props.socket.on("ROUND_OVER", (message: any) => {
      props.endRound(
        message.timer,
        message.leftDrawer,
        message.rightDrawer,
        message.word
      );
    });

    props.socket.on("GAME_OVER", () => {
      props.endGame();
    });

    props.socket.on("UPDATE_SCORE", (message: any) => {
      props.updateScore(String(message.playerId), message.points);
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
    };
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
      playerId: localStorage.getItem("playerId"),
      code: props.code,
      points: 200
    };

    props.socket.emit("SCORE", guesserMessage);

    const leftDrawerMessage = {
      playerId: props.leftDrawer,
      code: props.code,
      points: 100
    };

    props.socket.emit("SCORE", leftDrawerMessage);

    const rightDrawerMessage = {
      playerId: props.rightDrawer,
      code: props.code,
      points: 100
    };

    props.socket.emit("SCORE", rightDrawerMessage);
  };

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
          <Waiting message={"Waiting for other players to join"} />
        </Fragment>
      );
    }
  } else if (props.status == Status.RoundStarting) {
    if (Number(localStorage.getItem("playerId")) === 0) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"Game is starting soon"} />
          <CenterCountdownTimer
            startTimeInSeconds={5}
            timeRemainingInSeconds={5}
          />
        </Fragment>
      );
    } else if (props.leftDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be drawing!"} />
        </Fragment>
      );
    } else if (props.rightDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be drawing!"} />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be guessing!"} />
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
          id={Number(localStorage.getItem("playerId"))}
        />
      );
    } else if (props.rightDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <DrawingDisplay
          socket={props.socket}
          side="right"
          word={props.word.split(" ")[1]}
          time={45}
          id={Number(localStorage.getItem("playerId"))}
        />
      );
    } else if (Number(localStorage.getItem("playerId")) === 0) {
      console.log(props.players);
      return (
        <LeftRightDisplay
          {...props}
          socket={props.socket}
          word={props.word}
          time={45}
        />
      );
    } else if (
      props.players[Number(localStorage.getItem("playerId"))] &&
      props.players[Number(localStorage.getItem("playerId"))].correct
    ) {
      return (
        <Fragment>
          <CorrectDisplay />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <GuessBoard
            word={props.word}
            time={45}
            id={Number(localStorage.getItem("playerId"))}
            onCorrect={() => score()}
          />
        </Fragment>
      );
    }
  } else if (props.status == Status.RoundOver) {
    if (Number(localStorage.getItem("playerId")) === 0) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"Next round is starting soon"} />
          <div className="prev-word-sentence">The word was <strong className="prev-word">{props.prevWord.toUpperCase()}! </strong></div>

          <CenterCountdownTimer
            startTimeInSeconds={5}
            timeRemainingInSeconds={5}
          />
        </Fragment>
      );
    } else if (props.leftDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be drawing!"} />
        </Fragment>
      );
    } else if (props.rightDrawer === Number(localStorage.getItem("playerId"))) {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be drawing!"} />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Title />
          <Waiting message={"You will be guessing!"} />
        </Fragment>
      );
    }
  } else if (props.status == Status.GameOver) {
    if (Number(localStorage.getItem("playerId")) === 0) {
      return (
        <Fragment>
          <Title />
          <Result
            roomcode={props.code}
            players={props.players}
            restart={() => restart()}
          />
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
};

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedGame);

export default Game;
