import React from "react";
import Game from "./Game";
import words from "./words";

import "./guessboard.styles.scss";

const GuessBoard = () => {
  return (
    <Game words={words} attempts={0} cheatMode />
  );
}
export default GuessBoard;