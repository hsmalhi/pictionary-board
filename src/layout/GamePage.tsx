import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./Game";

const Home: React.FC = () => {
  return (
    <Fragment>
      <Game side="left"></Game>
      <Game side="right"></Game>
    </Fragment>
  );
};

export default Home;
