import React from "react";
import "./MissionItem.css";
import userIcon from "./img/user-solid.svg";

const MissionItem = (props) => {
  let statusDisplay = (
    <div
      className={`mission-item--status_chip mission-item--status_${props.status}`}
    >
      {props.statusText}
    </div>
  );

  return (
    <>
      {props.volunteers.map((volunteer) => (
        <div className="mission-item">
          <div className="mission-item--mission">
            {props.id + ". " + props.mission}
          </div>
          <div className="mission-item--location">{props.address}</div>
          {props.userRole !== "admin" ? (
            <div className="mission-item--time">{props.time}</div>
          ) : null}
          <div className="mission-item--reward">{props.score}</div>
          <div className="mission-item--status">{statusDisplay}</div>
          {props.userRole === "admin" ? (
            <div className="mission-item--buttons">
              <div className="mission-item--volunteer">
                <img src={userIcon} alt="" />
                <div>{volunteer}</div>
              </div>
              {props.status !== "not accepted" && props.status !== "accepted" ? (
                <button className="mission-item--button mission-item--check_button">
                  Xem ảnh nộp
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default MissionItem;
