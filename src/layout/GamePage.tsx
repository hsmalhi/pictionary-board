import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./Game";


const Home: React.FC = (props : any) => {

  return (
    <Fragment>
      <Game side="left" socket={props.socket}></Game>
      <Game side="right" socket={props.socket} ></Game>
    </Fragment>
  );
};

export default Home;
