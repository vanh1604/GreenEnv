import React, { useState, useEffect } from "react";
import callIcon from "../img/ic_call.png";
import locationIcon from "../img/ic_location_on.png";
import rewardIcon from "../img/ic_database.png";
import userIcon from "../img/user-solid.svg";
import pendingIcon from "../img/circle-exclamation-solid.svg";
import checkedIcon from "../img/circle-check-solid.svg";
import xmarkIcon from "../img/circle-xmark-solid.svg";
import missionImg from "../img/mission-img.png";
import "./Mission.css";
import { useNavigate } from "react-router";
import { colRefMissions, colRefUsers } from "../../../firebase";
import { updateDoc, doc, getDocs } from "firebase/firestore";
import MissionAccept from "../confirmation-boxes/mission-accept/MissionAccept";
import CheckImage from "../confirmation-boxes/check-image/CheckImage";
import { UserAuth } from "../../../context/AuthContext";

const Mission = (props) => {
  const navigate = useNavigate();
  const [confirmAccept, setConfirmAccept] = useState(false);
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [userDoc, setUserDoc] = useState({});
  const [volunteerDoc, setVolunteerDoc] = useState({});
  const [mission, setMission] = useState({});
  const { user } = UserAuth();
  const [statusDisplay, setStatusDisplay] = useState(null);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    const getUserDoc = async () => {
      const data = await getDocs(colRefUsers);
      data.docs.forEach((doc) => {
        if (doc.data().email === localStorage.email) {
          setUserDoc({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    if (user) getUserDoc();

    const getVolunteerDoc = async () => {
      const data = await getDocs(colRefUsers);
      data.docs.forEach((doc) => {
        if (doc.data().email === props.volunteer) {
          setVolunteerDoc({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getVolunteerDoc();

    const getMission = async () => {
      const data2 = await getDocs(colRefMissions);
      data2.docs.forEach((doc) => {
        if (doc.data().title === props.title) {
          //does not work if compare id
          setMission({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    if (user) getMission();
  }, []);

  const HandleAcceptMissionClicked = () => {
    if (!user) {
      alert("Vui lòng đăng nhập trước!");
      return;
    }
    setConfirmAccept(true);
  };

  const HandleCheckImageClicked = () => {
    if (!user) {
      alert("Vui lòng đăng nhập trước!");
      return;
    }
    setConfirmCheck(true);
  };

  const HandleAcceptMission = async () => {
    setConfirmAccept(false);
    await updateDoc(doc(colRefMissions, props.id), {
      volunteer: userDoc.email,
    });
    await updateDoc(doc(colRefMissions, props.id), {
      status: "accepted",
      statusText: "Mới",
    });
    setStatusDisplay(
      <div className={`mission--status_chip mission--status_accepted`}>Mới</div>
    );
    const getMission = async () => {
      const data2 = await getDocs(colRefMissions);
      data2.docs.forEach((doc) => {
        if (doc.data().title === props.title) {
          setMission({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getMission();
  };

  const HandleNotAcceptMission = () => {
    setConfirmAccept(false);
  };

  const HandleNotAcceptImage = async () => {
    await updateDoc(doc(colRefMissions, props.id), {
      status: "denied",
      statusText: "Chưa đạt",
    });
    setStatus("denied");
    setConfirmCheck(false);
  };

  const handleToMissionInfo = () => {
    navigate(`/missions/details/${props.id}`);
  };

  const HandleAcceptImage = async () => {
    await updateDoc(doc(colRefMissions, props.id), {
      status: "done",
      statusText: "Đã duyệt",
    });
    setStatus("done");
    let newScore = volunteerDoc.score + props.score;
    await updateDoc(doc(colRefUsers, `${props.volunteer}`), {
      // score: userDoc.score + props.score,
      score: newScore,
    });
    setConfirmCheck(false);
  };

  const HandleConfirmCheckExit = () => {
    setConfirmCheck(false);
  };

  return (
    <div className="mission">
      {confirmAccept ? (
        <MissionAccept
          title={mission.title}
          number={mission.number}
          address={mission.address}
          content={mission.content}
          score={mission.score}
          duration={mission.duration}
          id={mission.id}
          HandleAcceptMission={HandleAcceptMission}
          HandleNotAcceptMission={HandleNotAcceptMission}
        />
      ) : null}

      {confirmCheck ? (
        <CheckImage
          title={mission.title}
          number={mission.number}
          address={mission.address}
          content={mission.content}
          score={mission.score}
          duration={mission.duration}
          id={mission.id}
          HandleAcceptImage={HandleAcceptImage}
          HandleNotAcceptImage={HandleNotAcceptImage}
          HandleConfirmCheckExit={HandleConfirmCheckExit}
        />
      ) : null}

      <div className="mission--big_container">
        <div className="mission--container">
          <div className="mission--about_part">
            <div className="mission--about_part_line1">
              <div className="mission--title">{props.title}</div>
              {statusDisplay ? (
                statusDisplay
              ) : (
                <>
                  {props.volunteer === userDoc.email ? (
                    <div
                      className={`mission--status_chip mission--status_${props.status}`}
                    >
                      {props.statusText}
                    </div>
                  ) : null}
                </>
              )}
            </div>
            <div className="mission--description">{props.content}</div>
          </div>
          <div className="mission--contacts">
            <div className="mission--contact">
              <img
                src={callIcon}
                alt="phone call icon"
                className="mission--contact_icon"
              />
              <div className="mission--contact_info" id="contact-call">
                {props.number}
              </div>
            </div>
            <div className="mission--location">
              <img
                src={locationIcon}
                alt="location icon"
                className="mission--location_icon"
              />
              <div className="mission--location_info">{props.address}</div>
            </div>
          </div>
          <div className="mission--rewards">
            <img src={rewardIcon} alt="" className="mission--reward_icon" />
            <div className="mission--reward_value">+{props.score}</div>
          </div>
          {userDoc.role === "admin" ? (
            <div className="mission--admin_monitor_part">
              {status !== "not accepted" ? (
                <>
                  <div className="mission--volunteer">
                    <img
                      src={userIcon}
                      alt=""
                      className="mission--volunteer_icon"
                    />
                    <div className="mission--volunteer_info">
                      Người nhận:{" "}
                      <span className="mission--volunteer_email">
                        {props.volunteer}
                      </span>
                    </div>
                  </div>
                  <div className="mission--result">
                    {status === "accepted" || status === "pending" ? (
                      <>
                        <img
                          src={pendingIcon}
                          alt=""
                          className="mission--result_icon"
                        />
                        {status === "accepted" ? (
                          <div className="mission--result_info">
                            Kết quả:{" "}
                            <span className="mission--result_status">
                              Chưa nộp
                            </span>
                          </div>
                        ) : (
                          <div className="mission--result_info">
                            Kết quả:{" "}
                            <span className="mission--result_status">
                              Chưa duyệt
                            </span>
                          </div>
                        )}
                      </>
                    ) : null}
                    {status === "done" ? (
                      <>
                        <img
                          src={checkedIcon}
                          alt=""
                          className="mission--result_icon"
                        />
                        <div className="mission--result_info">
                          Kết quả:{" "}
                          <span className="mission--result_status">
                            Đã duyệt
                          </span>
                        </div>
                      </>
                    ) : null}
                    {status === "denied" ? (
                      <>
                        <img
                          src={xmarkIcon}
                          alt=""
                          className="mission--result_icon"
                        />
                        <div className="mission--result_info">
                          Kết quả:{" "}
                          <span className="mission--result_status">
                            {" "}
                            Chưa đạt
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </>
              ) : (
                "Nhiệm vụ chưa được nhận."
              )}
            </div>
          ) : null}

          <div className="mission--buttons">
            {userDoc.role !== "admin" &&
            (mission.status === "not accepted" || !user) ? (
              <button
                className="mission--button mission--join_button"
                onClick={HandleAcceptMissionClicked}
              >
                Tham gia
              </button>
            ) : null}
            <button
              className="mission--button mission--info_button"
              onClick={handleToMissionInfo}
            >
              Thông tin
            </button>
            {
              //userDoc.role === "admin" &&
              user && status !== "not accepted" && status !== "accepted" ? (
                <button
                  className="mission--button mission--check_button"
                  //onClick={handleApproveMissionWork}
                  onClick={HandleCheckImageClicked}
                >
                  Xem ảnh nộp
                </button>
              ) : null
            }
          </div>
          <div className="img-part">
            <img src={missionImg} alt="mission img" className="mission--img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
