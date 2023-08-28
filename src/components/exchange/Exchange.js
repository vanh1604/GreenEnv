import React from "react";
import "./Exchange.css";
import { useState, useEffect } from "react";
import { db, colRefUsers, colRefPresents } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Notification from "../common-components/Notification";

const Exchange = () => {
  const [presents, setPresents] = useState([]);
  const [userDoc, setUserDoc] = useState({});

  const [message, setMessage] = useState("");
  const [messageShowing, setMessageShowing] = useState(false);
  const [notifType, setNotifType] = useState("Thông báo");

  useEffect(() => {
    const getPresents = async () => {
      const data = await getDocs(colRefPresents);
      setPresents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPresents();

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
  }, []);

  const HandleMessageExit = () => {
    setMessageShowing(!messageShowing);
  };

  const Notify = (nType, nMessage) => {
    //notification type, notification message
    setNotifType(nType);
    setMessage(nMessage);
    if (nMessage != "")  HandleMessageExit();
  };

  const handleExchangePresent = async (present, user) => {
    if (user.exchange[present.id] === true) {
      Notify("Báo lỗi", "Bạn đã đổi quà này trước đây")
      return;
    }

    if (present.remain === 0) {
      Notify("Báo lỗi", "Quà bạn muốn đổi đã hết"); 
      return; 
    }

    if (user.score >= present.point) {
      Notify("Chúc mừng!", "Bạn đã đổi quà thành công!");
      let newScore = user.score - present.point;
      let newExchange = userDoc.exchange;
      let newRemain = present.remain - 1; 
      newExchange[present.id] = true;

      await updateDoc(doc(colRefUsers, `${userDoc.email}`), {
        score: newScore,
        exchange: newExchange,
      });

      await updateDoc(doc(colRefPresents, `${present.id}`), {
        remain: newRemain, 
      });

      window.location.reload(true);
    } else {
      Notify("Báo lỗi", "Bạn không đủ điểm để đổi quà");
    }
  };

  return (
    <>
      {messageShowing ? (
        <Notification
          notifType={notifType}
          message={message}
          HandleMessageExit={HandleMessageExit}
        />
      ) : null}
      <div>
        <div className="_263v2">
          <img
            src="https://vio.edu.vn/assets/de4e7150.png"
            width="50"
            height="50"
            alt="giftCategoryIc"
            className="CkcRL"
          />
          <span className="_9MmQs">Quà Chiến Binh</span>
        </div>


      <div className="exchange">
        {presents.map((present) => {
          return (
            <div className="exchange--each-box">
              <div className="exchange--border">
                <div className="present--name">{present.name}</div>

                  <div>
                    <img
                      src={present.pic}
                      alt="fu"
                      className="exchange--img"
                    ></img>
                  </div>

                  <div className="present--name present--remain">SL: {present.remain}</div>

                  <button
                    className={
                      (userDoc.exchange === undefined || userDoc.exchange[present.id] === true || present.remain === 0)
                        ? "exchange--button--outstock"
                        : "exchange--button--instock"
                    }
                    onClick={() =>
                      handleExchangePresent(
                        present,
                        userDoc
                      )
                    }
                  >
                    <img
                      src="https://vio.edu.vn/assets/63cb73d5.png"
                      width="20px"
                    ></img>
                    {present.point}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Exchange;
