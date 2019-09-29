import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Whiteboard from "./components/Whiteboard";
import Home from "./layout/Home";
import Lobby from "./layout/Lobby";
import Game from "./layout/Game";


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/Whiteboard" component={Whiteboard} />
          <Route exact path="/Lobby" component={Lobby} />
          <Route exact path="/Game" component={Game} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
