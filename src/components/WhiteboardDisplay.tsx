import React, { Fragment } from "react";
import Whiteboard from "./whiteboard/Whiteboard";
import ShowWord from "./ShowWord";

const WhiteboardDisplay = (props: any) => {
  return (
    <div className="whiteboard-display">
      <ShowWord word={props.word} />
      <Whiteboard {...props} side="left" socket={props.socket} />
    </div>
  );
};

export default WhiteboardDisplay;
