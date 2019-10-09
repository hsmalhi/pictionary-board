import React from "react";
import Avatar from "./avatar/avatar.component";
import "./avatarlist.styles.scss";
import { connect } from "react-redux";

const mapStateToProps = (state: { game: { players: any; leftDrawer: number; rightDrawer: number; }; }) => {
  return {
    players: state.game.players,
    leftDrawer: state.game.leftDrawer,
    rightDrawer: state.game.rightDrawer
  };
};

interface ConnectedAvatarList {
players: any
leftDrawer: number
rightDrawer:number

}

const ConnectedAvatarList = (props: ConnectedAvatarList) => {
  const player = props.players.map(
    (element: { id: number; correct: boolean; name: string }) => {
      if (
        element.id !== 0 &&
        Number(element.id) !== Number(props.leftDrawer) &&
        Number(element.id) !== Number(props.rightDrawer)
      ) {
        return (
          <Avatar
            id={element.id}
            correct={element.correct}
            name={element.name}
          />
        );
      } else return null;
    }
  );

  return <div className="avatar-bar">{player}</div>;
};

const AvatarList = connect(mapStateToProps)(ConnectedAvatarList);

export default AvatarList;
