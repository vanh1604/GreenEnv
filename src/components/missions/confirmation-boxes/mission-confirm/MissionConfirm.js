import React from "react";
import "../MissionConfirmCancel.css";

const MissionConfirm = (
  {title,
  point,
  address,
  number,
  content,
  duration,
  status,
  id,
  HandleNotAcceptMission,
  HandleAcceptMission}
) => {
  return (
    <div className="mision-confirm">
      <div className="mission-confirm--bg"></div>
      <div className="mission-confirm--notif">
        <div className="mission-confirm--headline">Xác nhận tham gia</div>
        <div className="mission-confirm--question">
          Bạn có chắc chắn muốn tham gia
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
            Tham gia
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionConfirm;
