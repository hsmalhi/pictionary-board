import React from "react";
import "./avatar.styles.scss";

const Avatar = () => {
  //avatar

  return (
    <div className="avatar-bar">
      <div className="avatar-container">
        <img
          alt="avatar"
          src={`https://robohash.org/10?set=set1&size=180x180`}
        />
      </div>
      <div className="avatar-container">
        <img
          alt="avatar"
          src={`https://robohash.org/11?set=set1&size=180x180`}
        />
      </div>
      <div className="avatar-container">
        <img
          alt="avatar"
          src={`https://robohash.org/12?set=set1&size=180x180`}
        />
      </div>
      <div className="avatar-container">
        <img
          alt="avatar"
          src={`https://robohash.org/13?set=set1&size=180x180`}
        />
      </div>
        {/* <h2>{props.monster.name}</h2>
    <p>{props.monster.email}</p>
    <p>{props.monster.phone}</p> */}
    </div>
  );
};

export default Avatar;
