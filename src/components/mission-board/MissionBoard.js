import React, { useState, useEffect } from "react";
import "./MissionBoard.css";
import MissionItem from "./MissionItem";
import { UserAuth } from "../../context/AuthContext";
import { getDocs } from "firebase/firestore";
import { colRefMissions, colRefUserMission } from "../../firebase";
import { useNavigate } from "react-router";

const MissionBoard = (props) => {
  const [missions, setMissions] = useState([]);
  const [userMissionLinks, setUserMissionLinks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getMissions = async () => {
      const data = await getDocs(colRefMissions);
      setMissions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getMissions();

    const getUserMissionLinks = async () => {
      const data = await getDocs(colRefUserMission);
      setUserMissionLinks(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getUserMissionLinks();

    // if (props.role !== props.userRole) {
    //   if (props.role === "admin") navigate("/user/missions");
    //   // else navigate("/admin/missions");
    // }
  }, [missions, userMissionLinks]);

  const { user } = UserAuth();

  let cnt = 0;

  return (
    <div className="mission-board">
      <div className="mission-board--title">{props.headline}</div>
      <div className="mission-board--labels">
        {props.userRole === "user" ? (
          <div className="mission-board--label">Nhiệm vụ</div>
        ) : null}
        {props.userRole === "user" ? (
          <div className="mission-board--label">Địa điểm</div>
        ) : null}
        {props.userRole === "admin" ? (
          <div className="mission-board--label">Người dùng</div>
        ) : null}
        {props.userRole === "admin" ? (
          <div className="mission-board--label">Nhận lúc</div>
        ) : null}
        {props.userRole === "admin" ? (
          <div className="mission-board--label">Cập nhật lúc</div>
        ) : null}
        {props.userRole === "user" ? (
          <div className="mission-board--label">Điểm thưởng</div>
        ) : null}
        <div className="mission-board--label">Trạng thái</div>
        <div className="mission-board--label">Ảnh nộp</div>
      </div>
      <div className="mission-board--missions">
        {props.userRole === "admin"
          ? userMissionLinks.map((userMissionLink) => {
              return missions.map((mission) => {
                if (
                  mission.id == userMissionLink.missionId &&
                  mission.id == props.missionId
                ) {
                  cnt++;
                  return (
                    <MissionItem
                      userRole={props.userRole}
                      id={mission.id}
                      mission={mission.mission}
                      // time="08:30AM"
                      acceptedAt="1 Jan 2023"
                      updatedAt="2 Jan 2023"
                      reward={mission.score}
                      title={mission.title}
                      content={mission.content}
                      address={mission.address}
                      number={mission.number}
                      score={mission.score}
                      volunteers={mission.volunteers}
                      userEmail={userMissionLink.userEmail}
                      userStatus={userMissionLink.userStatus}
                      userStatusText={userMissionLink.userStatusText}
                      key={mission.id}
                    />
                  );
                }
              });
            })
          : userMissionLinks.map((userMissionLink) => {
              return missions.map((mission) => {
                if (
                  userMissionLink.userEmail === user.email &&
                  userMissionLink.missionId == mission.id
                ) {
                  cnt++;
                  return (
                    <MissionItem
                      userRole={props.userRole}
                      id={mission.id}
                      mission={mission.mission}
                      time="08:30AM"
                      reward={mission.score}
                      title={mission.title}
                      content={mission.content}
                      address={mission.address}
                      number={mission.number}
                      score={mission.score}
                      volunteers={mission.volunteers}
                      userEmail={userMissionLink.userEmail}
                      userStatus={userMissionLink.userStatus}
                      userStatusText={userMissionLink.userStatusText}
                      key={mission.id}
                    />
                  );
                }
              });
            })}
        {/* {missions.map((mission) => {
          if (mission.volunteer === user.email)
            return (
              <MissionItem
                id={mission.id}
                mission={mission.mission}
                time="08:30AM"
                reward={mission.score}
                title={mission.title}
                content={mission.content}
                address={mission.address}
                number={mission.number}
                score={mission.score}
                status={mission.status}
                statusText={mission.statusText}
                //key = {mission.id}
              />
            );
        })} */}
        {cnt == 0 ? (
          <div className="mission-board--empty_notification">
            Chưa có người dùng nào nhận nhiệm vụ
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MissionBoard;
