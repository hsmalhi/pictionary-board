import React from "react";
import { Fragment } from "react";

import "./waiting.styles.scss";
//Customizabe canvas

const Waiting = (props: any) => {
  return (
    <Fragment>
      <div className="waiting-screen">
        <div className="waiting-message">{props.message}</div>
        {props.status === "lobby" &&
        <div className="lds-grid"><div></div><div></div><div></  div><div></div><div></div><div></div><div></div><div></div><div></div> </div>}
        {props.status === "starting" && <p></p>}
        {props.status === "drawing" && <i className="fas fa-pencil-alt"></i>}
        {props.status === "guessing" && <i className="fas fa-question-circle"></i>}
        {props.status === "done" && <p className="done-icon" >🎉</p>}
      </div>
    </Fragment>
  );
};

export default Waiting;