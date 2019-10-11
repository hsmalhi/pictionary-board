import React, { Fragment } from "react";

const Color = ({ onColorChange }: any) => {
  const setColor = (color: string) => () => {
    onColorChange(color);
  };
  return (
    <Fragment>
      <div className="tool color-black color-box" onClick={setColor("black")}>
        Black
      </div>
      <div className="tool color-grey color-box" onClick={setColor("grey")}>
        Grey
      </div>
      <div className="tool color-brown color-box" onClick={setColor("brown")}>
        Brown
      </div>
      <div className="tool color-orange color-box" onClick={setColor("orange")}>
        Orange
      </div>
      <div className="tool color-yellow color-box" onClick={setColor("yellow")}>
        Yellow
      </div>
      <div className="tool color-red color-box" onClick={setColor("red")}>
        Red
      </div>
      <div className="tool color-green color-box" onClick={setColor("green")}>
        Green
      </div>
      <div className="tool color-blue color-box" onClick={setColor("blue")}>
        Blue
      </div>
    </Fragment>
  );
};

export default Color;
