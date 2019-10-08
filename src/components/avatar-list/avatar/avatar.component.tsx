import React from "react";
import "./avatar.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Avatar = (props: any) => {
  if (props.correct) {
    return (
      <div className="avatar-flex avatar-correct">
        <span className="guess-check">
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <div className="avatar-container">
          <img
            className="avatar-pic"
            alt="avatar"
            src={`https://robohash.org/${props.id}?set=set1&size=180x180`}
          />
        </div>
        <div className="avatar-name">{props.name}</div>
      </div>
    );
  } else {
    return (
      <div className="avatar-flex avatar-incorrect">
        <div className="avatar-container">
          <img
            className="avatar-pic"
            alt="avatar"
            src={`https://robohash.org/${props.id}?set=set1&size=180x180`}
          />
        </div>
        <div className="avatar-name">{props.name}</div>
      </div>
    );
  }
};

export default Avatar;
