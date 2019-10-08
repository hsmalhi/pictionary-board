import React from "react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

import "./waiting.styles.scss";
//Customizabe canvas

const Waiting = (props: { message: React.ReactNode; status: string; }) => {
  return (
    <Fragment>
      <div className="waiting-screen">
        <div className="waiting-message">{props.message}</div>
        {props.status === "lobby" &&
        <div className="lds-grid"><div></div><div></div><div></  div><div></div><div></div><div></div><div></div><div></div><div></div> </div>}
        {props.status === "starting" && <p></p>}
        {props.status === "drawing" && <FontAwesomeIcon className="fas fa-pencil-alt" icon={faPencilAlt} />}
        {props.status === "guessing" && <FontAwesomeIcon className="fas fa-question-circle" icon={faQuestionCircle} />}
        {props.status === "done" && <span role="img" aria-label="party-popper"className="done-icon" >🎉</span>}
      </div>
    </Fragment>
  );
};

export default Waiting;