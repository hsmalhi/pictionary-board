import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header } from "../components/header.component";

import "./Home.styles.scss";

const socket = io("http://localhost:3001");
const Home: React.FC = () => {
  let id = 1;
  let room = "asd";
  const createRoom = function() {
    socket.emit("sign", { room: room, player: 0 });
  };
  const joinRoom = function() {
    socket.emit("sign", { room: room, player: id });
    id++;
  };
  return (
    <Fragment>
      <div className="home-page">
        <div className="game-title">PartyPic</div>
        <Header />
        <div className="create-room">
          <button id="create-room-button" onClick={createRoom}>
            <Link to={"/lobby/" + room}>Create Room</Link>
          </button>
        </div>
        <div className="join-room">
          <form className="join-room-form">
            <label>
              ROOM CODE
              <input
                type="text"
                name="roomcode"
                placeholder="ENTER THE ROOM CODE"
              />
            </label>
            <br />
            <label>
              NAME
              <input type="text" name="name" placeholder="ENTER YOUR NAME" />
            </label>
            <br />
            <input onClick={joinRoom} type="submit" name="PLAY" value="PLAY" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
