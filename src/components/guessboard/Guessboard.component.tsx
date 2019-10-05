import React, { Fragment } from "react";
import Game from "./Game";
import Title from "../title/title.component";

import "./guessboard.styles.scss";

const GuessBoard = (props: any) => {
  return (
    <Fragment>
      <Title />
      <Game word={props.word} onCorrect={props.onCorrect} />
    </Fragment>
  );
};

export default GuessBoard;
