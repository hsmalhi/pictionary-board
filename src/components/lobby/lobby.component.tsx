import React, { Fragment } from "react";
import Square from "./square.component";
import Title from "../title/title.component";

import "./lobby.styles.scss";

const LobbySetup = () => {
  const props: any = [
    { id: 0, roomcode: "KXY" },
    { id: 1, name: "Harjot" },
    { id: 2, name: "Ricky" },
    { id: 3, name: "Chen" },
    { id: 4, name: "Chris" },
    { id: 5, name: "Luke" },
    { id: 6, name: "Martin" },
    { id: 7, name: "Lighthouse" },
    { id: 8, name: "Labs" }
  ];
  const empty = Array(9 - props.length).fill("");
  return (
    <Fragment>
      <Title />
      <div className="game-board">
        {props.map((person: any) => {
          return (
            <Square
              id={person.id}
              name={person.name}
              roomcode={person.roomcode}
            />
          );
        })}
        {empty.map(() => {
          return <Square />;
        })}
      </div>
    </Fragment>
  );
};
export default LobbySetup;
