import React, { Fragment } from "react";

const Color = ({ onColorChange }: any) => {
  const setColor = (color: string) => () => {
    onColorChange(color);
  };
  return (
    <Fragment>
      <div className="tool color-black box" onClick={setColor("black")}>
        Black
      </div>
      <div className="tool color-grey box" onClick={setColor("grey")}>
        Grey
      </div>
      <div className="tool color-brown box" onClick={setColor("brown")}>
        Brown
      </div>
    
      <div className="tool color-orange box" onClick={setColor("orange")}>
        Orange
      </div>
      <div className="tool color-yellow box" onClick={setColor("yellow")}>
        Yellow
      </div>
      <div className="tool color-red box" onClick={setColor("red")}>
        Red
      </div>
      <div className="tool color-green box" onClick={setColor("green")}>
        Green
      </div>
      <div className="tool color-blue box" onClick={setColor("blue")}>
        Blue
      </div>
    </Fragment>
  );
};

export default Color;
