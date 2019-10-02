import React from "react";
import { Fragment } from "react";

import "./waiting.styles.scss";
//Customizabe canvas

const Waiting = (props: any) => {
  return (
    <Fragment>
      <div className="waiting-message">{props.message}</div>
    </Fragment>
  );
};

export default Waiting;