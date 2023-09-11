import React from "react";
import { useEffect, useState } from "react";
// import "../MissionConfirmCancel.css";
import "./AdminCheckImage.css"
import { storage } from "../../../../firebase";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { colRefUsers } from "../../../../firebase";
import { getDocs } from "firebase/firestore";
import { UserAuth } from "../../../../context/AuthContext";
import xmark from "./img/circle-xmark-regular.svg";
import MissionBoard from "../../../mission-board/MissionBoard";
import DarkBackground from "../../../common-components/DarkBackground";

const AdminCheckImage = ({
  title,
  score,
  address,
  number,
  content,
  duration,
  status,
  id,
  HandleNotAcceptImage,
  HandleAcceptImage,
  HandleConfirmCheckExit,
}) => {
  const [imageList, setImagelist] = useState([]);
  const imageListRef = ref(storage, `images/${id}/`);
  const [userDoc, setUserDoc] = useState({});

  const { user } = UserAuth();

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

    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImagelist((imageList) => [...imageList, url]);
        });
      });
    });
  }, []);

  return (
    <div className="check-image">
      {/* <div className="check-image--bg"></div> */}
      <DarkBackground />
      <div className="check-image--notif check-image--notif_checkImg">
        <div
          className="checkImg--xmark_container"
          onClick={HandleConfirmCheckExit}
        >
          <img src={xmark} alt="exit" />
        </div>
        {/* <div className="check-image--headline">
          Danh sách người dùng đã nộp
        </div> */}

        {/* <div className="checkImg--img_container">
          <img src={imageList[0]} className="CheckImage--img"></img>
        </div> */}

        <MissionBoard
          role="admin"
          userRole={userDoc.role}
          headline="DANH SÁCH NGƯỜI NHẬN NHIỆM VỤ"
          missionId={id}
        />

        {/* {userDoc.role === "admin" ? (
          <div className="check-image--buttons">
            <button
              className="check-image--button check-image--btn1_accept"
              onClick={HandleNotAcceptImage}
            >
              Không duyệt
            </button>
            <button
              className="check-image--button check-image--btn2_accept"
              onClick={HandleAcceptImage}
            >
              Duyệt
            </button>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default AdminCheckImage;
