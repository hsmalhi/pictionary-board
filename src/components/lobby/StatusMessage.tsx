import React, { Fragment } from "react";

const StatusMessage = (props: any) => {
  return (
    <Fragment>
      <div className="status-message">{props.children}</div>
    </Fragment>
  )
};
export default StatusMessage;