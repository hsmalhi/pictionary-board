import React, { Fragment } from "react";

interface StatusMessageProps{
  children:string
}

const StatusMessage = (props:StatusMessageProps) => {
  return (
    <Fragment>
      <div className="status-message">{props.children}</div>
    </Fragment>
  )
};
export default StatusMessage;