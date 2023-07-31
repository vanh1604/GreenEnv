import React, { useState, useEffect } from "react";
import "./MissionBoard.css";
import MissionItem from "./MissionItem";
import { UserAuth } from "../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const MissionBoard = () => {
  const [missions, setMissions] = useState([]);
  const usersCollectionRef = collection(db, "missions");
  useEffect(() => {
    const getMissions = async () => {
      const data = await getDocs(usersCollectionRef);
      setMissions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getMissions();
  }, []);

  const { user } = UserAuth();

  return (
    <div className="mission-board">
      <div className="mission-board--title">BẢNG NHIỆM VỤ</div>
      <div className="mission-board--labels">
        <div className="mission-board--label">Nhiệm vụ</div>
        <div className="mission-board--label">Địa điểm</div>
        <div className="mission-board--label">Thời gian</div>
        <div className="mission-board--label">Điểm thưởng</div>
        <div className="mission-board--label">Trạng thái</div>
      </div>
      <div className="mission-board--missions">
        {missions.map((mission, key = mission.id) => {
          if (mission.volunteer === user.email)
            return (
              <MissionItem
                id={mission.id}
                mission={mission.mission}
                time="08:30AM"
                reward={mission.point}
                title={mission.title}
                content={mission.content}
                address={mission.address}
                number={mission.number}
                point={mission.point}
                status={mission.status}
              />
            );
        })}
        {/* <MissionItem
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
        /> */}
      </div>
    </div>
  );
};

export default MissionBoard;
