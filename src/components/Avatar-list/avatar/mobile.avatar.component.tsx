import React from "react";
import "./mobile.avatar.styles.scss";

const MobileAvatar = (props: any) => {
  return (
    <div className="mavatar-container">
      <img
        className="mavatar-pic"
        alt="avatar"
        src={`https://robohash.org/${props.id}?set=set1&size=180x180`}
      />
    </div>
  );
};

export default MobileAvatar;
