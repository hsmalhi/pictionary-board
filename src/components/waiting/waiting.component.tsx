import React from "react";
import { Fragment } from "react";

import "./waiting.styles.scss";
//Customizabe canvas

const Waiting = (props: any) => {
  return (
    <Fragment>
      <div>
      <div className="waiting-message">{props.message}</div>
      <div className="lds-grid scaled y-transformed x-transformed"><div></div><div></div><div></  div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>
      </div>
    </Fragment>
  );
};

export default Waiting;