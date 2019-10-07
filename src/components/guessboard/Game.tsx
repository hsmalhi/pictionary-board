import React, { useState, useEffect } from "react";
import AnswerBox from "./AnswerBox";

import "./guessboard.styles.scss";


export default (props: any) => {

  const onCorrect = () => {
    props.onCorrect();
  };

  const onIncorrect = () => {
    // setScore(Math.max(0, score - 1));
  };

  return (
    <div className="center-wrapper">
      <AnswerBox
        answer={props.word}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />
    </div>
  );
};