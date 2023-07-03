import React from "react";
import "./MissionBoard.css";
import MissionItem from "./MissionItem";

const MissionBoard = () => {
  return (
    <div className="mission-board">
      <div className="mission-board--labels">
        <div className="mission-board--label">Nhiệm vụ</div>
        <div className="mission-board--label">Địa điểm</div>
        <div className="mission-board--label">Thời gian</div>
        <div className="mission-board--label">Điểm thưởng</div>
        <div className="mission-board--label">Trạng thái</div>
      </div>
      <div className="mission-board--missions">
        <MissionItem
          id="1"
          mission="Làm sạch khu vực"
          location="Vũ Phạm Hàm"
          time="08:30AM"
          reward={50}
          status="new"
        />
        <MissionItem
          id="2"
          mission="Làm sạch khu vực"
          location="Nguyễn Khánh Toàn"
          time="08:30AM"
          reward={30}
          status="new"
        />
        <MissionItem
          id="3"
          mission="Làm sạch khu vực"
          location="Trung Kính"
          time="08:30AM"
          reward={100}
          status="pending"
        />
        <MissionItem
          id="4"
          mission="Làm sạch khu vực"
          location="Thanh Xuân"
          time="08:30AM"
          reward={50}
          status="pending"
        />
        <MissionItem
          id="5"
          mission="Làm sạch khu vực"
          location="Nguyễn Xiển"
          time="08:30AM"
          reward={50}
          status="done"
        />
        <MissionItem
          id="6"
          mission="Làm sạch khu vực"
          location="Nguyễn Thị Định"
          time="08:30AM"
          reward={50}
          status="done"
        />
        <MissionItem
          id="7"
          mission="Làm sạch khu vực"
          location="Nguyễn Thị Định"
          time="08:30AM"
          reward={50}
          status="done"
        />
        <MissionItem
          id="8"
          mission="Làm sạch khu vực"
          location="Nguyễn Thị Định"
          time="08:30AM"
          reward={50}
          status="done"
        />
        <MissionItem
          id="9"
          mission="Làm sạch khu vực"
          location="Nguyễn Thị Định"
          time="08:30AM"
          reward={50}
          status="done"
        />
        <MissionItem
          id="10"
          mission="Làm sạch khu vực"
          location="Nguyễn Thị Định"
          time="08:30AM"
          reward={50}
          status="done"
        />
      </div>
    </div>
  );
};

export default MissionBoard;
