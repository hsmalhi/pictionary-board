import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./Game";

const Home: React.FC = () => {
  return (
    <Fragment>
      <Game side="1"></Game>
      <Game side="2"></Game>
    </Fragment>
  );
};

export default Home;
