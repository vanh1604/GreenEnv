import React from "react";
import "./Content.css";
import Mission from "./Mission";

import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";

const Content = (props) => {
  const [missions, setMissions] = useState([]);
  const usersCollectionRef = collection(db, "missions");
  useEffect(() => {
    const getMissions = async () => {
      const data = await getDocs(usersCollectionRef);
      setMissions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getMissions();
  }, []);

  const { user } = UserAuth();

  let cnt = 0;

  return (
    <div>
      {missions.map((mission) => {
        if (
          mission.status === "not accepted" ||
          (user && mission.volunteer === user.email) ||
          props.userRole === "admin"
        ) {
          cnt++;
          return (
            <Mission
              title={mission.title}
              content={mission.content}
              address={mission.address}
              number={mission.number}
              point={mission.point}
              status={mission.status}
              statusText={mission.statusText}
              volunteer={mission.volunteer}
              id={mission.id}
              key={mission.id}
            />
          );
        }
      })}
      {cnt == 0 ? (
        <div className="missions--empty_notification">
          Chưa có nhiệm vụ nào, bạn hãy quay lại sau nhé!
        </div>
      ) : null}
    </div>
  );
};

export default Content;