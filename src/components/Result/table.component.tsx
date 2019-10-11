import React, { Fragment } from "react";

import "./result.styles.scss";
import Avatar from "../Avatar-list/avatar/avatar.component";

const Table = (props: { id: number; name: React.ReactNode; score: React.ReactNode; }) => {
  if (props.id === 0) {
    return (
      <Fragment/>
    );
  } else {
    return (
      <Fragment>
        <tr>
          <td className="results-output"><Avatar id={props.id} name={null} correct={null} /></td>
          <td className="results-output">{props.name}</td>
          <td className="results-output">{props.score}</td>
        </tr>
      </Fragment>
    );
  }
};
export default Table;
