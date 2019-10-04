import React, { Fragment } from "react";
import Game from "./Game";
import Waiting from "../waiting/waiting.component";

import "./guessboard.styles.scss";

const props: any = {
  word: "star wars"
}

const GuessBoard = () => {
  return (
    <Fragment>
    <Waiting message={"Waiting for next players"} />
    <Game word={props.word} cheatMode />
    </Fragment>
  );
}

export default GuessBoard;