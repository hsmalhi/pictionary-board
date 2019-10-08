import React, { Fragment, Component } from "react";

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
          <td><Avatar id={props.id} /></td>
          <td>{props.name}</td>
          <td>{props.score}</td>
        </tr>
      </Fragment>
    );
  }
};
export default Table;
