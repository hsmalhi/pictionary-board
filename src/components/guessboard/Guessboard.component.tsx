import React, { Fragment } from "react";
import Game from "./Game";
import words from "./words";
import Waiting from "../waiting/waiting.component";

import "./guessboard.styles.scss";

const GuessBoard = () => {
  return (
    <Fragment>
    <Waiting message={"Waiting for next players"} />
    <Game words={words} attempts={0} cheatMode />
    </Fragment>
  );
}
export default GuessBoard;