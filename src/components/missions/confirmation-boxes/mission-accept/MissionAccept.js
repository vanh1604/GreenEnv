import React from "react";
import "../MissionConfirmCancel.css";
import DarkBackground from "../../../common-components/DarkBackground";

const MissionAccept = ({
  title,
  score,
  address,
  number,
  content,
  duration,
  status,
  id,
  HandleNotAcceptMission,
  HandleAcceptMission,
}) => {
  return (
    <div className="mission-confirm">
      {/* <div className="mission-confirm--bg"></div> */}
      <DarkBackground />
      <div className="mission-confirm--notif">
        <div className="mission-confirm--headline">Xác nhận tham gia</div>
        <div className="mission-confirm--question">
          Bạn có chắc chắn muốn tham gia?
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

export default MissionAccept;
