import React from "react";
import CountdownTimer from "./timer/timer.component";
import Avatar from "./avatar/avatar.component";

//Customizabe canvas

const Header = (props: any) => {
  
  return (
  <div>
    <Avatar />
    {/* <Timer /> */}
    <CountdownTimer startTimeInSeconds={45} timeRemainingInSeconds={45} />
  </div>
  )
};

export default Header;
