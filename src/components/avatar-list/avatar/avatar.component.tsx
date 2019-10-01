import React from "react";
import "./avatar.styles.scss";

const Avatar = (props: any) => {

  return (
      <div className="avatar-container">
        <img className="avatar-pic"
          alt="avatar"
          src={`https://robohash.org/${props.id}?set=set1&size=180x180`}
        />
      </div>
  );
};

export default Avatar;
