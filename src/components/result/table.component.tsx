import React, { Fragment } from "react";

import "./result.styles.scss";
import Avatar from "../avatar-list/avatar/avatar.component";

const Table = (props: any) => {
  if (props.id === 0) {
    return (
      <Fragment/>
    );
  } else {
    return (
      <Fragment>
        <tr>
          <td className="results-output"><Avatar className="results-avatar"id={props.id} /></td>
          <td className="results-output">{props.name}</td>
          <td className="results-output">{props.score}</td>
        </tr>
      </Fragment>
    );
  }
};
export default Table;
