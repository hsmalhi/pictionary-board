import React, { Fragment } from "react";

import Avatar from "../avatar-list/avatar/avatar.component";

import "./lobby.styles.scss";

const Square = (props: any) => {
  if (props.roomcode) {
    return (
      <Fragment>
        <div className="box">
          <div>Room Code: {props.roomcode}</div>

          <div>
            <button>Start Game</button>
          </div>
        </div>
      </Fragment>
    );
  } else if (!props.id || !props.name) {
    return (
      <Fragment>
        <div className="box">Empty</div>
      </Fragment>
    );
  } else {
    return (
      <div className="box">
        <Avatar id={props.id} />
        {props.name}
      </div>
    );
  }
};
export default Square;
