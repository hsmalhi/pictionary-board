import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home: React.FC = (props: any) => {
  let id = 1;
  let room = "asd";
  

  const createRoom = function() {
    props.socket.emit("sign", { room: room, player: 0 });
    props.socket.emit("getRooms", "abc");

  };

  const joinRoom = function() {
    props.socket.emit("sign", { room: room, player: id });
    id++;
  };

  return (
    <Fragment>
      <div>Home</div>
      <ul>
        <li>
          <button onClick={createRoom}>
          </button>
            <Link to={"/lobby/" + room}>Create Room</Link>
        </li>
        <li>
          <button onClick={joinRoom}>
            <Link to={"/lobby/" + room}>Join Room</Link>
          </button>
        </li>
      </ul>
    </Fragment>
  );
};

export default Home;
