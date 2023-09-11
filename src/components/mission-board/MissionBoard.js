import React, { useState, useEffect } from "react";
import "./MissionBoard.css";
import MissionItem from "./MissionItem";
import { UserAuth } from "../../context/AuthContext";
import { getDocs } from "firebase/firestore";
<<<<<<< Updated upstream
import { colRefMissions, colRefUsers } from "../../firebase";
=======
import { colRefMissions, colRefUserMission } from "../../firebase";
>>>>>>> Stashed changes
import { useNavigate } from "react-router";

const MissionBoard = (props) => {
  const [missions, setMissions] = useState([]);
<<<<<<< Updated upstream
  const [userDoc, setUserDoc] = useState({});
=======
  const [userMissionLinks, setUserMissionLinks] = useState([]);
>>>>>>> Stashed changes
  const navigate = useNavigate();
  useEffect(() => {
    const getMissions = async () => {
      const data = await getDocs(colRefMissions);
      setMissions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getMissions();

<<<<<<< Updated upstream
    const getUserDoc = async () => {
      const data = await getDocs(colRefUsers);
      data.docs.forEach((doc) => {
        if (doc.data().email === localStorage.email) {
          setUserDoc({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getUserDoc();

    if (props.role !== props.userRole) {
      if (props.role === "user") navigate("/admin/missions");
      else navigate("/user/missions");
    }
=======
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
>>>>>>> Stashed changes
  }, []);

  const { user } = UserAuth();

  let cnt = 0;

  return (
    <div className="mission-board">
      <div className="mission-board--title">{props.headline}</div>
      <div className="mission-board--labels">
<<<<<<< Updated upstream
        <div className="mission-board--label">Nhiệm vụ</div>
        <div className="mission-board--label">Địa điểm</div>
        {userDoc.role !== "admin" ? (
          <div className="mission-board--label">Thời gian</div>
        ) : null}
        <div className="mission-board--label">Điểm thưởng</div>
        <div className="mission-board--label">Trạng thái</div>
        {userDoc.role === "admin" ? (
          <div className="mission-board--label">Người nhận</div>
        ) : null}
      </div>
      <div className="mission-board--missions">
        {missions.map((mission) => {
          if (
            mission.volunteers.includes(user.email) ||
            (userDoc.role === "admin" && mission.status !== "not accepted")
          )
=======
        {props.userRole === "user" ? (
          <div className="mission-board--label">Nhiệm vụ</div>
        ) : null}
        {props.userRole === "user" ? (
          <div className="mission-board--label">Địa điểm</div>
        ) : null}
        <div className="mission-board--label">Người dùng</div>
        <div className="mission-board--label">Nhận lúc</div>
        <div className="mission-board--label">Cập nhật lúc</div>
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
>>>>>>> Stashed changes
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
                volunteers={mission.volunteers}
                statusText={mission.statusText}
                userRole={userDoc.role}
                //key = {mission.id}
              />
            );
        })} */}
        {cnt == 0 ? (
          <div className="mission-board--empty_notification">
            Chưa có người dùng nào nộp nhiệm vụ
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MissionBoard;
