import React from "react";
import Avatar from "../avatar-list/avatar/avatar.component";
import "./avatarlist.styles.scss";

interface AvatarListProps {
  id:number
  guess:boolean
  name:string
}

const AvatarList = () => {
  let props = [
    { id: 1, guess: false, name: "Ricky" },
    { id: 2, guess: true, name: "Harjot" },
    { id: 3, guess: true, name: "Chen" },

    { id: 4, guess: false, name: "Ricky" },
    { id: 5, guess: true, name: "Harjot" },
    { id: 6, guess: true, name: "Chen" },

    { id: 7, guess: false, name: "Ricky" },
    { id: 8, guess: true, name: "Harjot" }
  ];
  const player = props.map(element => {
    return <Avatar id={element.id} guess={element.guess} name={element.name} />;
  });

  return <div className="avatar-bar">{player}</div>;
};

export default AvatarList;
