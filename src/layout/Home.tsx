import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Title from "../components/title/title.component";
import "./Home.styles.scss";

const Home: any = (props: any) => {
  // localStorage.removeItem('playerId');

  const [ path, setPath ] = useState(null);
  const [ name, setName ] = useState(null);
  const [ roomCode, setRoomCode ] = useState(null);

  function roomCodeChange(event: any) {
    setRoomCode(event.target.value.toUpperCase());
  }

  function nameChange(event: any) {
    setName(event.target.value);
  }

  const createRoom = function() {
    props.socket.emit("SETUP");

    props.socket.on("ROOM_CREATED", (message: any) => {
      localStorage.setItem('playerId', message.playerId);
      setPath(message.code);
    })
  };

  const validate = function() {
    if (name === null || roomCode === null) {
      //TODO: SET ERROR HERE!!!
      return;
    }
    
    let message = {
      code: roomCode, 
      name: name
    };

    props.socket.emit("JOIN", message);

    props.socket.on("ROOM_JOINED", (message: any) => {
      if (message.error) {
        //TODO: make this visual
        console.log(message.error);
      } else {
        localStorage.setItem('playerId', message.playerId);
        setPath(roomCode);
      }
    })
  };

  if (path) {
    return (<Redirect to={"/" + path}></Redirect>)
  }

  return (
    <Fragment>
      <div className="home-page">
        <Title />
        <div className="create-room">
          <button className="create-room_button" onClick={createRoom}>
              Create Room
          </button>
        </div>
        <div className="join-room">
          <form className="join-room_form">
            <label className="join-room_label">
              ROOM CODE
              <input
                onChange={roomCodeChange}
                className="join-room_input_code"
                type="text"
                name="roomcode"
                maxLength={Number(3)}
                placeholder="ENTER THE ROOM CODE"
                value={roomCode}
              />
            </label>
            <br />
            <label className="join-room_label">
              NAME
              <input
                onChange={nameChange}
                className="join-room_input"
                type="text"
                name="name"
                maxLength={Number(10)}
                placeholder="ENTER YOUR NAME"
                value={name}
              />
            </label>
            <br />
            <button
              className="join-room_button"
              onTouchStart={validate}
              name="PLAY"
              value="PLAY">
              PLAY
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
