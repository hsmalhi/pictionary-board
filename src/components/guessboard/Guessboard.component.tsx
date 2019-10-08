import React, { Fragment } from "react";
import Game from "./Game";

import "./guessboard.styles.scss";
import MobileCountdownTimer from "../timer/mobile.timer.component";
import MobileAvatar from "../avatar-list/avatar/mobile.avatar.component";

const GuessBoard = (props: any) => {
  return (
    <Fragment>
      <MobileCountdownTimer
        startTimeInSeconds={props.time}
        timeRemainingInSeconds={props.time}
      />
      <div className="mAvatar">
        <MobileAvatar id={props.id} />
      </div>
      <Game word={props.word} onCorrect={props.onCorrect} />
    </Fragment>
  );
};

export default GuessBoard;
