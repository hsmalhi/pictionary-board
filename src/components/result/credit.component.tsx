import React, { Fragment } from "react";

import "./result.styles.scss";
import Avatar from "../avatar-list/avatar/avatar.component";

const Credit = (props: any) => {
  if (props.id === 0) {
    return (
      <Fragment/>
    );
  } else {
    return (
      <Fragment>
        <div className="result">
          <Avatar id={props.id} />
          <div className="result-display">
            Player: {props.name}
            <br/>
            Score: {props.score}
          </div>
        </div>
      </Fragment>
    );
  }
};
export default Credit;
