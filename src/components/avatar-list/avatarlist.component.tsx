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
  // const players = props.players.slice(1);
  // console.log(players);
  const player = props.players.map(
    (element: { id: number; correct: boolean; name: string }) => {
      if (
        element.id !== 0 &&
        element.id !== Number(props.leftDrawer) &&
        element.id !== Number(props.rightDrawer)
      ) {
        return (
          <Avatar
            id={element.id}
            correct={element.correct}
            name={element.name}
          />
        );
      }
    }
  );

  return <div className="avatar-bar">{player}</div>;
};

const AvatarList = connect(mapStateToProps)(ConnectedAvatarList);

export default AvatarList;
