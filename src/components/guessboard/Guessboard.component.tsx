import React, { Fragment } from "react";
import Game from "./Game";
import Title from "../title/title.component";

import "./guessboard.styles.scss";
import MobileCountdownTimer from "../timer/mobile.timer.component";
import MobileAvatar from "../avatar-list/avatar/mobile.avatar.component";
import ShowWord from "../ShowWord";

const GuessBoard = (props: any) => {
  return (  
    <Fragment>
      <ShowWord word={props.name} />
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
