import React, { Fragment } from "react";
import Title from "../title/title.component";
import Credit from "./credit.component";

import "./result.styles.scss";

const Result = (props: any) => {
  // const props: any = [
  //   { id: 0, roomcode: "KXY" },
  //   { id: 1, name: "Harjot", score: 5 },
  //   { id: 2, name: "Ricky", score: 2 },
  //   { id: 3, name: "Chen", score: 6 },
  //   { id: 4, name: "Chris", score: 10 },
  //   { id: 5, name: "Luke", score: 25 },
  //   { id: 6, name: "Martin", score: 20 }
  //   // { id: 7, name: "Lighthouse" },
  //   // { id: 8, name: "Labs" }
  // ];
  let playersSorted = props.players.sort((a: any, b: any) => {
      if (a.id === 0) {
        return -1
      } else if (b.id === 0) {
        return 1
      } else {
        return (a.score > b.score ? -1 : b.score > a.score ? 1 : 0)
      }
    }
  );

  return (
    <Fragment>
      <div className="result-board">
        <div className="wrapper">
          {playersSorted.map((player: any) => {
            return (
              <Credit
                name={player.name}
                score={player.score}
                id={player.id}
              />
            );
          })}
        </div>
      </div>
      {/* <div className="results-button"> */}
      <button>Home</button>
      <button onClick={props.restart}>Replay</button>
      {/* </div> */}
    </Fragment>
  );
};
export default Result;
