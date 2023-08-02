import React, { useState, useEffect } from "react";
import "./MissionBoard.css";
import MissionItem from "./MissionItem";
import { UserAuth } from "../../context/AuthContext";
import { getDocs } from "firebase/firestore";
import { colRefMissions } from "../../firebase";
import { useNavigate } from "react-router";

const MissionBoard = (props) => {
  const [missions, setMissions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getMissions = async () => {
      const data = await getDocs(colRefMissions);
      setMissions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getMissions();

    if (props.role !== props.userRole) {
      if (props.role === "user") navigate("/admin/missions")
      else navigate("/user/missions");
    }
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
        {missions.map((mission) => {
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
                statusText={mission.statusText}
                //key = {mission.id}
              />
            );
        })}
      </div>
    </div>
  );
};

export default MissionBoard;
