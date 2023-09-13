import React from "react";
import { useEffect, useState } from "react";
import "./AdminChangeMissionStatus.css";
import { storage } from "../../../../firebase";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { colRefUsers } from "../../../../firebase";
import { getDocs } from "firebase/firestore";
import { UserAuth } from "../../../../context/AuthContext";
import xmark from "./img/circle-xmark-regular.svg";
import MissionBoard from "../../../mission-board/MissionBoard";
import DarkBackground from "../../../common-components/DarkBackground";

const AdminChangeMissionStatus = ({
  AdminMissionStatusExit,
  AdminMissionStatusRegisterOpen,
  AdminMissionStatusRegisterClosed,
  AdminMissionStatusInProgress,
  AdminMissionStatusDone,
}) => {
  return (
    <div className="change-status">
      {/* <div className="change-status--bg"></div> */}
      <DarkBackground />
      <div className="change-status--notif change-status--notif_checkImg">
        <div
          className="change-status--xmark_container"
          onClick={AdminMissionStatusExit}
        >
          <img src={xmark} alt="exit" />
        </div>
        <div className="change-status--headline">Ảnh đã nộp</div>
        <div className="change-status--instruction">
          Chọn trạng thái của nhiệm vụ
        </div>
        <div className="change-status--options">
          <div
            className={`change-status--status_chip change-status--status_registerOpen`}
            onClick={AdminMissionStatusRegisterOpen}
          >
            Mở đăng kí
          </div>
          <div
            className={`change-status--status_chip change-status--status_registerClosed`}
            onClick={AdminMissionStatusRegisterClosed}
          >
            Đóng đăng kí
          </div>
          <div
            className={`change-status--status_chip change-status--status_inProgress`}
            onClick={AdminMissionStatusInProgress}
          >
            Đang thực hiện
          </div>
          <div
            className={`change-status--status_chip change-status--status_done`}
            onClick={AdminMissionStatusDone}
          >
            Kết thúc
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChangeMissionStatus;
