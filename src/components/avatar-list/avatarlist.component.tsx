import React from "react";
import Avatar from "../avatar-list/avatar/avatar.component";
import "./avatarlist.styles.scss";

const AvatarList = () => {
  //avatar

  let id = [11, 12, 13, 14, 15, 16, 17, 18];
  const avatarID = id.map(element => {
    return <Avatar id={element} />;
  });

  return <div className="avatar-bar">{avatarID}</div>;
};

export default AvatarList;
