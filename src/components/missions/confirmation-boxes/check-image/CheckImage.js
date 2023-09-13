import React from "react";
import { useEffect, useState } from "react";
import "../MissionConfirmCancel.css";
// import "./CheckImage.css";
import { storage } from "../../../../firebase";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { colRefUsers } from "../../../../firebase";
import { getDocs } from "firebase/firestore";
import { UserAuth } from "../../../../context/AuthContext";
import xmark from "./img/circle-xmark-regular.svg";
import DarkBackground from "../../../common-components/DarkBackground";

const CheckImage = ({
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
  prev,
  email,
}) => {
  const [imageList, setImagelist] = useState([]);
  const imageListRef = ref(storage, `images/${id}/`);
  const [userDoc, setUserDoc] = useState({});
  const [userPic, setUserPic] = useState(""); 

  const { user } = UserAuth();

  let style = {};

  {
    prev !== "MissionItem"
      ? (style = { marginTop: "10px" })
      : (style = { marginTop: "-25px" });
  }

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
          if (item.name === email) 
          setImagelist((imageList) => [...imageList, url]);
          //console.log(item.name);
        });
      });
    });

    console.log(userPic);
  }, []);

  return (
    <div className="mission-confirm">
      {/* <div className="mission-confirm--bg"></div> */}
      {/* {prev !== "MissionItem" ? <DarkBackground /> : null} */}
      {userDoc.role && userDoc.role !== "admin" ? <DarkBackground /> : null}
      <div
        className="mission-confirm--notif mission-confirm--notif_checkImg"
        style={style}
      >
        <div
          className="checkImg--xmark_container"
          onClick={HandleConfirmCheckExit}
        >
          <img src={xmark} alt="exit" />
        </div>
        <div className="mission-confirm--headline">Ảnh đã nộp</div>

        <div className="checkImg--img_container">
          {imageList.length > 0 ? (
            <img src={imageList[0]} className="CheckImage--img"></img>
          ) : (
            <div>Chưa có ảnh nộp</div>
          )}
        </div>

        {userDoc.role === "admin" ? (
          <div className="mission-confirm--buttons">
            <button
              className="mission-confirm--button mission-confirm--btn1_accept"
              onClick={HandleNotAcceptImage}
            >
              Không duyệt
            </button>
            <button
              className="mission-confirm--button mission-confirm--btn2_accept"
              onClick={HandleAcceptImage}
            >
              Duyệt
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CheckImage;
