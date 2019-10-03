import React, { Fragment } from "react";
import Whiteboard from "./whiteboard/Whiteboard";
import ShowWord from "./ShowWord";

const DrawingDisplay = (props: any) => {
  return (
    <div className="whiteboard-display">
      <ShowWord word={props.word} />
      <Whiteboard {...props} side={props.side} socket={props.socket} />
    </div>
  );
};

export default DrawingDisplay;
