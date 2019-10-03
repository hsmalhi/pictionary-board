import React, { Fragment } from "react";
import Title from "../title/title.component";
import Credit from "./credit.component";

import "./result.styles.scss";

const Result = () => {
  const props: any = [
    { id: 0, roomcode: "KXY" },
    { id: 1, name: "Harjot", score: 5 },
    { id: 2, name: "Ricky", score: 2 },
    { id: 3, name: "Chen", score: 6 },
    { id: 4, name: "Chris", score: 10 },
    { id: 5, name: "Luke", score: 25 },
    { id: 6, name: "Martin", score: 20 }
    // { id: 7, name: "Lighthouse" },
    // { id: 8, name: "Labs" }
  ];
  let propsSorted = props.sort((a: any, b: any) =>
    a.score > b.score ? -1 : b.score > a.score ? 1 : 0
  );

  console.log(propsSorted);
  return (
    <Fragment>
      <Title />
      <div className="result-board">
        <div className="wrapper">
          {propsSorted.map((person: any) => {
            return (
              <Credit
                roomcode={person.roomcode}
                name={person.name}
                score={person.score}
                id={person.id}
              />
            );
          })}
        </div>
      </div>
      <button>Home</button>
      <button>Replay</button>
    </Fragment>
  );
};
export default Result;
