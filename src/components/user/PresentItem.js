import React from "react";
import "./PresentItem.css";

const PresentItem = (props) => {

  let statusDisplay = <div className={`present-item--status_chip present-item--status_${props.status}`}>{props.statusText}</div>

  return (
    <div className="present-item">
      <div className="present-item--present">{props.id + "."}</div>
      <div className="present-item--location">{props.name}</div>
      <img src = {props.link} alt = "fu" className = "present-item--image"></img>
    </div>
  );
};

export default PresentItem;
