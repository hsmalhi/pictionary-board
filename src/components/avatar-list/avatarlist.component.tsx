import React from "react";
import Avatar from "../avatar-list/avatar/avatar.component";
import "./avatarlist.styles.scss";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
  return {
    players: state.game.players,
    leftDrawer: state.game.leftDrawer,
    rightDrawer: state.game.rightDrawer
  };
};

const ConnectedAvatarList = (props: any) => {
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
