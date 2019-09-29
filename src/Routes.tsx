import React from "react";
import "./App.css";
import Whiteboard from "./components/Whiteboard";
import Home from "./layout/Home";
import Lobby from "./layout/Lobby";
import GamePage from "./layout/GamePage";


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Route exact path="/Game/:roomid/:playerid" component={Whiteboard} />
        <Route exact path="/lobby/:id" component={Lobby}/>
        <Route exact path="/game/:id" component={GamePage} />
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
};

export default Routes;
