import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Credit from "./credit.component";

import "./result.styles.scss";
import Table from "./table.component";

const Result = (props:any) => {

  let playersSorted = props.players.sort((a: any, b: any) => {
    if (a.id === 0) {
      return -1;
    } else if (b.id === 0) {
      return 1;
    } else {
      return a.score > b.score ? -1 : b.score > a.score ? 1 : 0;
    }
  });
  let topThree = playersSorted.slice(0, 4);

  return (
    <Fragment>
      <div>
        <div className="result-board">
          <div className="wrapper">
            {playersSorted.map((player: { name: string; score: number; id: number; }) => {
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
          <table className="results-content">
            <thead className="results-heading">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody className="results-body">
              {topThree.map((player: { name: React.ReactNode; score: React.ReactNode; id: number; }) => {
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
          <span className="input-group-btn">
            <Link className="link-home" to="/">Home</Link>
          </span>
          <button onClick={props.restart}>Replay</button>
        </div>
      </div>
    </Fragment>
  );
};
export default Result;
