import React from "react";
import "../MissionConfirmCancel.css";

const MissionAccept = ({
  title,
  score,
  address,
  number,
  content,
  duration,
  status,
  id,
  HandleNotAcceptImage,
  HandleAcceptImage,
}) => {
  return (
    <div className="mision-confirm">
      <div className="mission-confirm--bg"></div>
      <div className="mission-confirm--notif">
        <div className="mission-confirm--headline">Ảnh người dùng</div>
        <div className="mission-confirm--buttons">
          <button
            className="mission-confirm--button mission-confirm--btn1_accept"
            onClick={HandleNotAcceptImage}
          >
            Không duyệt
          </button>
          <button
            className="mission-confirm--button mission-confirm--btn2_accept"
            onClick={HandleAcceptImage}
          >
            Duyệt
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionAccept;
