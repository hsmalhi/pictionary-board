import React, { Fragment } from "react";
import "./result.styles.scss";
import Avatar from "../Avatar-list/avatar/avatar.component";

interface CreditProps {
  id:number
  name:string
  score:number
}

const Credit = ({id, name, score}: CreditProps) => {
  if (id === 0) {
    return (
      <Fragment/>
    );
  } else {
    return (
      <Fragment>
        <div className="result">
          <Avatar id={id} name={null} correct={null} />
          <div className="result-display">
            Player: {name}
            <br />
            Score: {score}
          </div>
        </div>
      </Fragment>
    );
  }
};
export default Credit;
