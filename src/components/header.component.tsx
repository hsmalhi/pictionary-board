import React from "react";
import AvatarList from "./avatar-list/avatarlist.component";
import Title from "./title/title.component";
import CountdownTimer from "./timer/timer.component";

import "./header.styles.scss";

//Customizabe canvas

const Header = (props: any) => {
  
  return (
  <div className="header">
    <AvatarList />
    <Title />
    <CountdownTimer startTimeInSeconds={45} timeRemainingInSeconds={45} />
  </div>
  )
};

export default Header;
