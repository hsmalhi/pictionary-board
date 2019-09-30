import React from "react";
import "./App.css";
import Whiteboard from "./components/Whiteboard";
import Home from "./layout/Home";
import Lobby from "./layout/Lobby";
import GamePage from "./layout/GamePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const socket :any = io("http://localhost:3001");



const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Route exact path="/game/:id" component={(props : any)=><GamePage {...props} socket={socket}/>} />
        <Route exact path="/Game/:roomid/:playerid" component={(props : any)=><Whiteboard {...props} socket={socket} />} />
        <Route exact path="/lobby/:id" component={(props : any)=><Lobby {...props} socket={socket}/>}/>
        <Route exact path="/" component={(props : any)=><Home{...props} socket={socket}/>} />
      </div>
    </Router>
  );
};

export default Routes;
