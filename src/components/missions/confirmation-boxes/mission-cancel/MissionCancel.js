import React from "react";
import "../MissionConfirmCancel.css";
import DarkBackground from "../../../common-components/DarkBackground";

const MissionCancel = ({
  title,
  score,
  address,
  number,
  content,
  duration,
  status,
  id,
  HandleKeepMission,
  HandleCancelMission,
}) => {

  return (
    <div className="mission-confirm">
      {/* <div className="mission-confirm--bg"></div> */}
      <DarkBackground />
      <div className="mission-confirm--notif">
        <div className="mission-confirm--headline">Xác nhận hủy</div>
        <div className="mission-confirm--question">
          Bạn có chắc chắn muốn hủy nhiệm vụ?
        </div>
        <div className="mission-confirm--buttons">
          <button
            className="mission-confirm--button mission-confirm--btn1_cancel"
            onClick={HandleKeepMission}
          >
            Giữ lại
          </button>

          <button
            className="mission-confirm--button mission-confirm--btn2_cancel"
            onClick={HandleCancelMission}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionCancel;
