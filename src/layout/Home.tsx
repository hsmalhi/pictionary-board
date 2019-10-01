import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../components/header.component";

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
        <Header />
        <div className="create-room">
          <button className="create-room_button" onClick={createRoom}>
            <Link className="create-room_link" to={"/lobby/" + room}> Create Room </Link>
          </button>
        </div>
        <div className="join-room">
          <form className="join-room_form">
            <label className="join-room_label">
              ROOM CODE
              <input className="join-room_input"
                type="text"
                name="roomcode"
                placeholder="ENTER THE ROOM CODE"
              />
            </label>
            <br />
            <label className="join-room_label">
              NAME
              <input className="join-room_input" type="text" name="name" placeholder="ENTER YOUR NAME" />
            </label>
            <br />
            <input className="join-room_button"onClick={joinRoom} type="submit" name="PLAY" value="PLAY" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
