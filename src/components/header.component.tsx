import React from "react";
import { Fragment } from "react";
import AvatarList from "./avatar-list/avatarlist.component";
import Title from "./title/title.component";
import CountdownTimer from "./timer/timer.component";

import "./header.styles.scss";

//Customizabe canvas

const Header = () => {
  return (
    <Fragment>
      <div className="header">
        <Title />
        <CountdownTimer startTimeInSeconds={45} timeRemainingInSeconds={45} />
      </div>
      <AvatarList />
    </Fragment>
  );
};

export default Header;
