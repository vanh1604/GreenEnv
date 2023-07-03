import React from "react";
import "./MissionItem.css";

const MissionItem = (props) => {

  let statusDisplay;

  if (props.status === "new") {
    statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Mới</div>
  }
  else if (props.status === "pending") {
    statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Chờ duyệt</div>
  }
  else if (props.status === "done") {
    statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Đã duyệt</div>
  }

  return (
    <div className="mission-item">
      <div className="mission-item--mission">{props.mission}</div>
      <div className="mission-item--location">{props.location}</div>
      <div className="mission-item--time">{props.time}</div>
      <div className="mission-item--reward">{props.reward}</div>
      <div className="mission-item--status">
      {statusDisplay}
      </div>
    </div>
  );
};

export default MissionItem;
