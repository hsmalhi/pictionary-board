import React from "react";
import BoardDisplay from "./BoardDisplay";
import Word from "./Word"
import "../components/styles/GamePage.scss"


const Home: React.FC  = (props : any) => {

  return (
    <div className="game-page">
      <div className="flex">
        <Word word="Battle Ship"/>
      <BoardDisplay className="left" {...props} side="left" socket={props.socket} ></BoardDisplay>
      <BoardDisplay className="right" {...props} side="right" socket={props.socket} ></BoardDisplay>
      </div>
      </div>
  );
};

export default Home;
