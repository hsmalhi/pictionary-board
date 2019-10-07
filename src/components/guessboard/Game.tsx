import React, { useState, useEffect } from "react";
import AnswerBox from "./AnswerBox";

import "./guessboard.styles.scss";


export default (props: any) => {
  const [ shake, setShake ] = useState(false);
  const [ error, setError ] = useState(false);

  const onCorrect = () => {
    props.onCorrect();
  };

  const onIncorrect = () => {
    setShake(true);
    setError(true);
    setTimeout(() => {
      setShake(false);
    }, 500)
  };

  return (
    <div className="center-wrapper">
      <AnswerBox
        answer={props.word}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
        shake={shake}
      />
      {!error && <p className="incorrect-placeholder">EMPTY</p>}
      {error && <p className="incorrect-guess">That's not right!</p>}
    </div>
  );
};