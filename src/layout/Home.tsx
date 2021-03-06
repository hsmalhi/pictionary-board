import React, { Fragment, useState } from "react";
import {
  Redirect
} from "react-router-dom";
import Title from "../components/Title/title.component";
import "../components/Styles/Home.styles.scss"
import MyVerticallyCenteredModal from "../components/Home/Modal";
import { ButtonToolbar } from "react-bootstrap";
import { Socket } from "socket.io";


interface HomeProps {
  socket: Socket;
}

const Home = (props: HomeProps) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [path, setPath] = useState(null);
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);
  const [roomCode, setRoomCode] = useState(null);

  function roomCodeChange(event: { target: { value: { toUpperCase: () => void; }; }; }) {
    setRoomCode(event.target.value.toUpperCase());
  }

  function nameChange(event: { target: { value: string; }; }) {
    setName(event.target.value);
  }

  const createRoom = function() {
    props.socket.emit("SETUP");

    props.socket.on("ROOM_CREATED", (message) => {
      localStorage.setItem("playerId", message.playerId);
      setPath(message.code);
    });
  };

  const validate = function(event: React.TouchEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!roomCode) {
      setError("Enter the room code that's displayed on the main screen");
      return;
    } else if (!name) {
      setError("What's your name?");
      return;
    } else {
    }

    let message = {
      code: roomCode,
      name: name
    };

    props.socket.emit("JOIN", message);

    props.socket.on("ROOM_JOINED", (message) => {
      if (message.error) {
        setError(message.error);
        return;
      } else {
        localStorage.setItem("playerId", message.playerId);
        setPath(roomCode);
      }
    });
  };

  if (path) {
    return <Redirect to={"/" + path}></Redirect>;
  }

  return (
    <Fragment>
      <div className="home-page" >
        <Title />
        <div className="buttons-flex">
          <div className="create-room">
            <button className="create create-room_button" onClick={createRoom}>
              Create Room
            </button>
          </div>
          <div className="create-room">
            <ButtonToolbar>
              <button
                className="instructions create-room_button"
                onClick={() => setModalShow(true)}
              >
                Instructions
              </button>

              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </ButtonToolbar>
          </div>
        </div>
        <div className="join-room">
          <form
            className="join-room_form"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <label className="join-room_label">
              ROOM CODE
              <input
                onChange={roomCodeChange}
                className="join-room_input_code"
                type="text"
                name="roomcode"
                maxLength={Number(3)}
                placeholder="ENTER ROOM CODE"
                value={roomCode}
              />
            </label>
    
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
              onTouchStart={event => validate(event)}
              name="PLAY"
              value="PLAY"
            >
              PLAY
            </button>
            <p className="join-status-message">{error}</p>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
