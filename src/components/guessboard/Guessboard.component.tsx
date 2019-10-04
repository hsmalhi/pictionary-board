import React, { Fragment } from "react";
import Game from "./Game";
import Waiting from "../waiting/waiting.component";

import "./guessboard.styles.scss";

const GuessBoard = (props: any) => {
  return (
    <Fragment>
    <Waiting message={"Waiting for next players"} />
    <Game word={props.word} onCorrect={props.onCorrect} />
    </Fragment>
  );
}

export default GuessBoard;