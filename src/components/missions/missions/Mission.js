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
import {
  colRefMissions,
  colRefUsers,
  colRefUserMission,
} from "../../../firebase";
import { updateDoc, doc, getDocs, setDoc } from "firebase/firestore";
import MissionAccept from "../confirmation-boxes/mission-accept/MissionAccept";
import CheckImage from "../confirmation-boxes/check-image/CheckImage";
import AdminCheckImage from "../confirmation-boxes/admin-check-image/AdminCheckImage";
import Notification from "../../common-components/Notification";
import { UserAuth } from "../../../context/AuthContext";
import AdminChangeMissionStatus from "../confirmation-boxes/admin-change-mission-status/AdminChangeMissionStatus";

const Mission = (props) => {
  const navigate = useNavigate();
  const [confirmAccept, setConfirmAccept] = useState(false);
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [confirmAdminCheck, setConfirmAdminCheck] = useState(false);
  const [confirmAdminChangeStatus, setConfirmAdminChangeStatus] =
    useState(false);
  const [userDoc, setUserDoc] = useState({});
  const [volunteerDoc, setVolunteerDoc] = useState({});
  const [mission, setMission] = useState({});
  const [userMissionLink, setUserMissionLink] = useState({});
  const { user } = UserAuth();
  const [statusDisplay, setStatusDisplay] = useState(null);
  const [status, setStatus] = useState(props.userStatus);
  const [messageShowing, setMessageShowing] = useState(false);
  const [notifType, setNotifType] = useState("Thông báo");
  const [message, setMessage] = useState("");
  const [volunteers, setVolunteers] = useState(null);

  // console.log(props.userStatus, props.userStatusText);

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
        if (props.volunteers.includes(doc.data().email)) {
          setVolunteerDoc({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getVolunteerDoc();

    // const getVolunteerDoc = async () => {
    //   const data = await getDocs(colRefUsers);
    //   data.docs.forEach((doc) => {
    //     if (doc.data().email === props.volunteer) {
    //       setVolunteerDoc({ ...doc.data(), id: doc.id });
    //       return;
    //     }
    //   });
    // };
    // getVolunteerDoc();

    const getMission = async () => {
      const data = await getDocs(colRefMissions);
      data.docs.forEach((doc) => {
        if (doc.data().title === props.title) {
          //does not work if compare id
          setMission({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    // if (user)
    getMission();

    // const getUserMissionLink = async () => {
    //   const data = await getDocs(colRefUserMission);
    //   data.docs.forEach((doc) => {
    //     if (
    //       doc.data().userEmail === userDoc.email &&
    //       doc.data().missionId == mission.id
    //     ) {
    //       setUserMissionLink({ ...doc.data(), id: doc.id });
    //       return;
    //     }
    //   });
    // };
    // getUserMissionLink();
  }, []);

  useEffect(() => {
    const getUserMissionLink = async () => {
      const data = await getDocs(colRefUserMission);
      data.docs.forEach((doc) => {
        if (
          doc.data().userEmail === userDoc.email &&
          doc.data().missionId == mission.id
        ) {
          setUserMissionLink({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getUserMissionLink();

    setVolunteers(mission.volunteers);
  }, [mission]);

  const HandleMessageExit = () => {
    setMessageShowing(!messageShowing);
  };

  const HandleAcceptMissionClicked = () => {
    if (!user) {
      // alert("Vui lòng đăng nhập trước!");
      setNotifType("Bạn chưa thể nhận nhiệm vụ!");
      setMessage("Vui lòng đăng nhập trước!");
      HandleMessageExit();
      return;
    }
    setConfirmAccept(true);
  };

  const HandleCheckImageClicked = () => {
    if (!user) {
      // alert("Vui lòng đăng nhập trước!");
      setNotifType("Bạn chưa thể xem ảnh nộp!");
      setMessage("Vui lòng đăng nhập trước!");
      HandleMessageExit();
      return;
    }
    setConfirmCheck(true);
  };

  const HandleAdminCheckImageClicked = () => {
    if (!user) {
      // alert("Vui lòng đăng nhập trước!");
      setNotifType("Bạn chưa thể xem ảnh nộp!");
      setMessage("Vui lòng đăng nhập trước!");
      HandleMessageExit();
      return;
    }
    setConfirmAdminCheck(true);
  };

  const HandleAcceptMission = async () => {
    setConfirmAccept(false);
    if (!mission.volunteers.includes(userDoc.email)) {
      await updateDoc(doc(colRefMissions, props.id), {
        volunteers: [...mission.volunteers, userDoc.email],
        volunteersLength: mission.volunteersLength + 1,
      });
    }
    // await updateDoc(doc(colRefMissions, props.id), {
    //   volunteer: userDoc.email,
    // });
    // await updateDoc(doc(colRefMissions, props.id), {
    //   status: "accepted",
    //   statusText: "Đang làm",
    // });
    await setDoc(
      doc(
        colRefUserMission,
        `${userDoc.email} | ${mission.title} (id: ${mission.id})`
      ),
      {
        missionId: mission.id,
        userEmail: userDoc.email,
        userStatus: "accepted",
        userStatusText: "Đang làm",
      }
    );

    // const getUserMissionLink = async () => {
    //   const data = await getDocs(colRefUserMission);
    //   data.docs.forEach((doc) => {
    //     if (
    //       doc.data().userEmail === userDoc.email &&
    //       doc.data().missionId == mission.id
    //     ) {
    //       setUserMissionLink({ ...doc.data(), id: doc.id });
    //       return;
    //     }
    //   });
    // };
    // getUserMissionLink();

    setStatusDisplay(
      <div className={`mission--status_chip mission--status_accepted`}>
        Đang làm
      </div>
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

  const HandleAdminNotAcceptImage = async () => {
    // await updateDoc(doc(colRefMissions, props.id), {
    //   status: "denied",
    //   statusText: "Chưa đạt",
    // });
    await updateDoc(
      doc(
        colRefUserMission,
        `${userDoc.email} | ${mission.title} (id: ${mission.id})`
      ),
      {
        userStatus: "denied",
        userStatusText: "Chưa đạt",
      }
    );

    setStatus("denied");
    setConfirmCheck(false);
  };

  const handleToMissionInfo = () => {
    navigate(`/missions/details/${props.id}`);
  };

  const HandleAdminAcceptImage = async () => {
    // await updateDoc(doc(colRefMissions, props.id), {
    //   status: "done",
    //   statusText: "Đã duyệt",
    // });
    await updateDoc(
      doc(
        colRefUserMission,
        `${userDoc.email} | ${mission.title} (id: ${mission.id})`
      ),
      {
        userStatus: "done",
        userStatusText: "Đã duyệt",
      }
    );
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

  const HandleConfirmAdminCheckExit = () => {
    setConfirmAdminCheck(false);
  };

  const AdminMissionStatusClicked = () => {
    setConfirmAdminChangeStatus(true);
  };

  const AdminMissionStatusExit = () => {
    setConfirmAdminChangeStatus(false);
    const getMission = async () => {
      const data = await getDocs(colRefMissions);
      data.docs.forEach((doc) => {
        if (doc.data().title === props.title) {
          //does not work if compare id
          setMission({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    // if (user)
    getMission();
  };

  const AdminMissionStatusRegisterOpen = async () => {
    await updateDoc(doc(colRefMissions, props.id), {
      status: "registerOpen",
      statusText: "Mở đăng kí",
    });
    AdminMissionStatusExit();
  };

  const AdminMissionStatusRegisterClosed = async () => {
    await updateDoc(doc(colRefMissions, props.id), {
      status: "registerClosed",
      statusText: "Đóng đăng kí",
    });
    AdminMissionStatusExit();
  };

  const AdminMissionStatusInProgress = async () => {
    await updateDoc(doc(colRefMissions, props.id), {
      status: "inProgress",
      statusText: "Đang thực hiện",
    });
    AdminMissionStatusExit();
  };

  const AdminMissionStatusDone = async () => {
    await updateDoc(doc(colRefMissions, props.id), {
      status: "done",
      statusText: "Kết thúc",
    });
    AdminMissionStatusExit();
  };

  return (
    <div className="mission">
      {messageShowing ? (
        <Notification
          notifType={notifType}
          message={message}
          HandleMessageExit={HandleMessageExit}
        />
      ) : null}
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
          email = {localStorage.email}
          // HandleAcceptImage={HandleAcceptImage}
          // HandleNotAcceptImage={HandleNotAcceptImage}
          HandleConfirmCheckExit={HandleConfirmCheckExit}
        />
      ) : null}

      {confirmAdminCheck ? (
        <AdminCheckImage
          title={mission.title}
          number={mission.number}
          address={mission.address}
          content={mission.content}
          score={mission.score}
          duration={mission.duration}
          id={mission.id}
          HandleAcceptImage={HandleAdminAcceptImage}
          HandleNotAcceptImage={HandleAdminNotAcceptImage}
          HandleConfirmCheckExit={HandleConfirmAdminCheckExit}
        />
      ) : null}

      {confirmAdminChangeStatus ? (
        <AdminChangeMissionStatus
          AdminMissionStatusExit={AdminMissionStatusExit}
          AdminMissionStatusRegisterOpen={AdminMissionStatusRegisterOpen}
          AdminMissionStatusRegisterClosed={AdminMissionStatusRegisterClosed}
          AdminMissionStatusInProgress={AdminMissionStatusInProgress}
          AdminMissionStatusDone={AdminMissionStatusDone}
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
                  {/* {props.volunteers.includes(userDoc.email) ? ( */}
                  {!userMissionLink.userStatus || !user ? (
                    <div
                      className={`mission--status_chip mission--status_${props.userStatus}`}
                    >
                      {props.userStatusText}
                    </div>
                  ) : (
                    <div
                      className={`mission--status_chip mission--status_${userMissionLink.userStatus}`}
                    >
                      {userMissionLink.userStatusText}
                    </div>
                  )}
                  {userDoc.role === "admin" ? (
                    <div
                      className={`mission--status_chip mission--status_${mission.status} clickable`}
                      onClick={AdminMissionStatusClicked}
                    >
                      {mission.statusText}
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
          <div className="mission--volunteers_required">
            <img src={userIcon} alt="" /> {mission.volunteersLength} /{" "}
            {mission.volunteersRequired}
          </div>
          {/* {userDoc.role === "admin" ? (
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
          ) : null} */}

          <div className="mission--buttons">
            {userDoc.role !== "admin" &&
            !props.userStatus &&
            (!userMissionLink.userStatus || !user) ? (
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
              user &&
              status &&
              status !== "not accepted" &&
              status !== "accepted" ? (
                <button
                  className="mission--button mission--check_button"
                  //onClick={handleApproveMissionWork}
                  onClick={HandleCheckImageClicked}
                >
                  Xem ảnh nộp
                </button>
              ) : null
            }
            {userDoc.role === "admin" ? (
              <button
                className="mision--button mision--check--admin_button"
                onClick={HandleAdminCheckImageClicked}
              >
                Những người nhận nhiệm vụ
              </button>
            ) : null}
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
