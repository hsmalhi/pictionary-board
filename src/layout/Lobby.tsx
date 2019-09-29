import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

interface Iprops {
  location: any;
}
const Lobby: React.FC<Iprops> = props => {
  let lobby = props.location.pathname.split("/");
lobby = lobby[2]
  return (
    <Fragment>
      <div>Lobby {lobby}</div>
      <Link to={"/Game/"+ lobby}>Game</Link>
    </Fragment>
  );
};  

export default Lobby;
