import React from 'react';
import "../MissionConfirmCancel.css";

const MissionCancel = () => {
  return (
    <div className='mision-confirm'>
      <div className="mission-confirm-bg"></div>
      <div className="mission-confirm-notif">
        <div className="headline">Xác nhận hủy</div>
        <div className="confirm-question">Bạn có chắc chắn muốn hủy nhiệm vụ</div>
        <div className="buttons">
          <button className="btn1">Giữ lại</button>
          <button className="btn2">Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default MissionCancel;