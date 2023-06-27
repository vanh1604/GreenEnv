import React from 'react';
import "../MissionConfirmCancel.css";

const MissionConfirm = () => {
  return (
    <div className='mision-confirm'>
      <div className="mission-confirm-bg"></div>
      <div className="mission-confirm-notif">
        <div className="headline">Xác nhận tham gia</div>
        <div className="confirm-question">Bạn có chắc chắn muốn tham gia</div>
        <div className="buttons">
          <button className="btn1">Hủy</button>
          <button className="btn2">Tham gia</button>
        </div>
      </div>
    </div>
  );
};

export default MissionConfirm;