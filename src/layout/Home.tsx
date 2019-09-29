import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home: React.FC = () => {


  return (
    <Fragment>
      <div>Home</div>
      <ul>
        <li>
          <Link to="/asd">Create Room</Link>
        </li>
        <li>
          <Link to="/asd">Join Room</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Home;
