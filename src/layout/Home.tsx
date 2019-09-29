import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const Home: React.FC = () => {
  return (
    <Fragment>
      <div>Home</div>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Whiteboard">Whiteboard</Link>
          </li>
          <li>
            <Link to="/Lobby">Lobby</Link>
          </li>
        </ul>
      
    </Fragment>
  );
};

export default Home;
