import React, { Fragment } from "react";
import Whiteboard from "./whiteboard/Whiteboard";

const WhiteboardDisplay = (props: any) => {
  return (
      <div className="whiteboard-display">
      <Whiteboard {...props} side="left" socket={props.socket} />
      </div>
  );
};

export default WhiteboardDisplay;
