import React from "react";
import "../MissionConfirmCancel.css";

const MissionAccept = ({
  HandleNotAcceptMission,
  HandleAcceptMission,
}) => {
  return (
    <div className="mision-confirm">
      <div className="mission-confirm--bg"></div>
      <div className="mission-confirm--notif">
        <div className="mission-confirm--headline">Địa chỉ nhận hàng</div>
        <div className="form-info">
            <div className = "input--name">
            Tên:
            </div>
            <input type = "text" className="input--css"></input>
        </div>
        <div className="form-info">
            <div className = "input--name">
            SĐT:
            </div>
            <input type = "text" className="input--css"></input>
        </div>
        <div className="form-info">
            <div className = "input--name">
            Địa chỉ:
            </div>
            <input type = "text" className="input--css"></input>
        </div>
        <div className="mission-confirm--buttons">
          <button
            className="mission-confirm--button mission-confirm--btn1_accept"
            onClick={HandleNotAcceptMission}
          >
            Hủy
          </button>
          <button
            className="mission-confirm--button mission-confirm--btn2_accept"
            onClick={HandleAcceptMission}
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionAccept;
