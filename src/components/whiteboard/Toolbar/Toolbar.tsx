import React from "react";
import Color from "./Color/Color";

const Toolbar = ({ onColorChange }: any) => {
  return (
    <div className="toolbar">
      <Color onColorChange={onColorChange} />
    </div>
  );
};

export default Toolbar;
