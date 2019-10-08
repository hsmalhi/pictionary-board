import React, { Fragment } from "react";
import Credit from "./credit.component";

import "./result.styles.scss";
import Table from "./table.component";

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
      return -1;
    } else if (b.id === 0) {
      return 1;
    } else {
      return a.score > b.score ? -1 : b.score > a.score ? 1 : 0;
    }
  });
  let topThree = playersSorted.slice(0,4);

  return (
    <Fragment>
      <div>
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
        <span className="results-table">
          <div className="results-header">Top 3 Players</div>
          <table>
            <thead className="results-heading">
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody className="results-body">
              {topThree.map((player: any) => {
                return (
                  <Table
                    name={player.name}
                    score={player.score}
                    id={player.id}
                  />
                );
              })}
            </tbody>
          </table>
        </span>
        <div className="results-button">
          <button>Home</button>
          <button onClick={props.restart}>Replay</button>
        </div>
      </div>
    </Fragment>
  );
};
export default Result;
