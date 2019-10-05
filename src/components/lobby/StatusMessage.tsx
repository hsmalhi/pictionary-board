import React, { Fragment } from "react";

const StatusMessage = (props: any) => {
  return (
    <Fragment>
      <p className="status-message">{props.children}</p>
    </Fragment>
  )
};
export default StatusMessage;