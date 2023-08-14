import React from "react";
import "./MissionItem.css";

const MissionItem = (props) => {

  let statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>{props.statusText}</div>

  // if (props.status === "accepted") {
  //   statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Mới</div>
  // }
  // else if (props.status === "pending") {
  //   statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Chưa duyệt</div>
  // }
  // else if (props.status === "denied") {
  //   statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Chưa đạt</div>
  // }
  // else if (props.status === "done") {
  //   statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Đã duyệt</div>
  // }

  return (
    <div className="mission-item">
      <div className="mission-item--mission">{props.id + ". " + props.mission}</div>
      <div className="mission-item--location">{props.address}</div>
      <div className="mission-item--time">{props.time}</div>
      <div className="mission-item--reward">{props.score}</div>
      <div className="mission-item--status">
      {statusDisplay}
      </div>
    </div>
  );
};

export default MissionItem;
