import React from "react";
import "./App.css";
import Home from "./layout/Home";
import { BrowserRouter as Router, Route, } from "react-router-dom";
import Game from "./components/Game";

// const socket :any = io("http://localhost:3001");

const socket :any = io("https://pictionary-server.herokuapp.com/");

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
           <Route
          exact
          path="/:id"
          component={(props: any) => <Game {...props} socket={socket} />}
        />
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
