import React, { useEffect } from "react";
import "./CollaborationInvitation.css";
import sendIcon from "./img/end icon.svg";
import { useState } from "react";
import { colRefMessages, colRefMessengerCount } from "../../firebase";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import Notification from "../common-components/Notification";

const CollaborationInvitation = () => {
  const [colabName, setColabName] = useState("");
  const [colabEmail, setColabEmail] = useState("");
  const [colabMessage, setColabMessage] = useState("");
  const [messengerCount, setMessengerCount] = useState(0);

  const [message, setMessage] = useState("");
  const [messageShowing, setMessageShowing] = useState(false);
  const [notifType, setNotifType] = useState("Thông báo");

  useEffect(() => {
    const getMessengerCount = async () => {
      const count = await getDoc(doc(colRefMessengerCount, "messengerCount"));
      setMessengerCount(count.data().value);
    };
    getMessengerCount();
  });

  const HandleMessageExit = () => {
    setMessageShowing(!messageShowing);
  };

  const Notify = (nType, nMessage) => {
    //notification type, notification message
    setNotifType(nType);
    setMessage(nMessage);
    if (nMessage != "") HandleMessageExit();
  };

  const handleColabFormSubmit = async (e) => {
    e.preventDefault();
    const d = new Date();
    await setDoc(
      doc(
        colRefMessages,
        `${messengerCount + 1} | ${colabEmail} | ${colabName} | ${d}`
      ),
      {
        email: colabEmail,
        name: colabName,
        message: colabMessage,
      }
    );
    await updateDoc(doc(colRefMessengerCount, "messengerCount"), {
      value: messengerCount + 1,
    });
    Notify("Thông báo", "Bạn đã gửi biểu mẫu thành công! Xin cảm ơn bạn vì đã liên hệ với Green Env.")
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
      <div className="collaborationInvitation">
        <div className="ci--text">
          <div className="ci--headline">Bạn có một dự án?</div>
          <div className="ci--instructions">
            <div className="ci--instruction1">
              Sử dụng biểu mẫu để liên hệ và đóng góp với chúng tôi. Chúng tôi
              sẽ liên hệ với bạn khi có thể
            </div>
            <div className="ci--instruction2">
              Ngoài ra, hãy liên lạc bằng cách sử dụng thông tin bên dưới.
            </div>
          </div>
          <div className="ci--contacts">
            <div className="ci--contact_email">greenenv@gmail.com</div>
            <div className="ci--contact_call">(+84) 912 345 678</div>
          </div>
        </div>
        <form className="ci--form" onSubmit={handleColabFormSubmit}>
          <div className="ci--personal_info">
            <input
              type="text"
              className="ci--form_name"
              placeholder="Tên"
              onChange={(e) => setColabName(e.target.value)}
            />
            <input
              type="tel"
              className="ci--form_phone"
              placeholder="Email"
              onChange={(e) => setColabEmail(e.target.value)}
            />
          </div>
          <input
            type="text"
            className="ci--form_details"
            placeholder="Chi tiết"
            onChange={(e) => setColabMessage(e.target.value)}
          />
          <div className="ci--btn_container">
            <button className="ci--send">
              Gửi
              <img src={sendIcon} alt="" className="ci--send_icon" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CollaborationInvitation;
