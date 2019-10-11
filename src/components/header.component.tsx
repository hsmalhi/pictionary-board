import React from "react";
import { Fragment } from "react";
import AvatarList from "../components/Avatar-list/avatarlist.component"
import Title from "./Title/title.component";
import CountdownTimer from "./Timer/timer.component";
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
