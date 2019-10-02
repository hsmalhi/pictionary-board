import React from "react";
import "./App.css";
import Whiteboard from "./components/whiteboard/Whiteboard";
import Home from "./layout/Home";
import Lobby from "./layout/Lobby";
import GamePage from "./components/GamePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./components/Game";
import GuessBoard from "../src/components/guessboard/Guessboard.component";
const socket :any = io("http://pictionary-server.herokuapp.com/");

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Route exact path="/game/:id" component={(props : any)=><GamePage {...props} socket={socket}/>} />
        <Route exact path="/guess" component={(props : any)=><GuessBoard/>} />
        <Route exact path="/Game/:roomid/:playerid" component={(props : any)=><Whiteboard {...props} socket={socket} />} />
        {/* <Route exact path="/lobby/:id" component={(props : any)=><Lobby {...props} socket={socket}/>}/> */}
        <Route exact path="/:id" component={(props : any)=><Game {...props} socket={socket}/>}/>
        <Route exact path="/" component={(props : any)=><Home{...props} socket={socket}/>} />
      </div>
    </Router>
  );
};

export default Routes;
