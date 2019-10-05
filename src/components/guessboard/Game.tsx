import React, { useState, useEffect } from "react";
import AnswerBox from "./AnswerBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import "./guessboard.styles.scss";


export default (props: any) => {

  const onCorrect = () => {
    props.onCorrect();
    return (
      <div>
        <FontAwesomeIcon className="checkmark-icon"icon={faCheckCircle} />
      </div>
    )

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