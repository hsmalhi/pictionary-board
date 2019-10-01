import React from "react";
import Game from "./Game";
import words from "./words";


const GuessBoard = () => {
  return (
    <Game flags={words} attempts={0} cheatMode />
  );
}
export default GuessBoard;