import React from "react";
import "../MissionConfirmCancel.css";
// import { useNavigate } from "react-router";
// import { colRefMissions } from "../../../../firebase";
// import { getDocs, updateDoc, doc } from "firebase/firestore";

const MissionCancel = ({
  title,
  point,
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
    <div className="mision-confirm">
      <div className="mission-confirm--bg"></div>
      <div className="mission-confirm--notif">
        <div className="mission-confirm--headline">Xác nhận hủy</div>
        <div className="mission-confirm--question">
          Bạn có chắc chắn muốn hủy nhiệm vụ
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
