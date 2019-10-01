import React, { Fragment } from "react";

const Color = ({ onColorChange }: any) => {
  return (
    <Fragment>
      <div className="tool color-black box">Black</div>
      <div className="tool color-grey box">Grey</div>
      <div className="tool color-purple box">purple</div>
      <div className="tool color-orange box">Orange</div>

      <div className="tool color-yellow box">Yellow</div>
      <div className="tool color-red box">Red</div>
      <div className="tool color-green box">Green</div>
      <div className="tool color-blue box">Blue</div>
    </Fragment>
  );
};

export default Color;
