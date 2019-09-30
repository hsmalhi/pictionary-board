import React from "react";
import Game from "./Game";
import Word from "../components/Word"
import "../components/styles/GamePage.scss"


const Home: React.FC  = (props : any) => {

  return (
      <div className="flex">
        <Word word="Star Wars"/>
      <Game className="left" {...props} side="left" socket={props.socket} ></Game>
      <Game className="right" {...props} side="right" socket={props.socket} ></Game>
      </div>
  );
};

export default Home;
