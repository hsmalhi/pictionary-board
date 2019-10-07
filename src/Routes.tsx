import React from "react";
import "./App.css";
import Home from "./layout/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./components/Game";
import LobbySetup from "./components/lobby/lobby.component";
import Result from "./components/result/result.component";
import GuessBoard from "../src/components/guessboard/Guessboard.component";
import DrawingDisplay from "./components/DrawingDisplay";
import LeftRightDisplay from "./components/LeftRightDisplay";
import CenterCountdownTimer from "./components/timer/center.time.component";
// const socket :any = io("http://localhost:3001");

const socket :any = io("https://pictionary-server.herokuapp.com/");

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Route exact path="/guess" component={(props : any)=><GuessBoard word={"star wars"} onCorrect={console.log("correct")}/>} />
        <Route exact path="/lobby" component={(props : any)=><LobbySetup/>} />
        <Route exact path="/result" component={(props : any)=><Result/>} />
        <Route exact path="/display/:id" component={(props : any)=><LeftRightDisplay word="star wars" time={45} side="lef t" socket={socket}/>} />
        <Route exact path="/game/:id" component={(props : any)=><DrawingDisplay id={5} word="star" time={45} side="left" socket={socket}/>} />

        {/* <Route
          exact
          path="/:id"
          component={(props: any) => <Game {...props} socket={socket} />}
        /> */}
        <Route
          exact
          path="/"
          component={(props: any) => <Home {...props} socket={socket} />}
        />
      </div>
    </Router>
  );
};

export default Routes;
