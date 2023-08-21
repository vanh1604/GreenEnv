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
        {
          /* console.log(mission.volunteers.includes(user.email)); */
        }
        if (
          mission.volunteersLength < mission.volunteersRequired ||
          (user && mission.volunteers.includes(user.email)) ||
          props.userRole === "admin"
        ) {
          cnt++;
          return (
            <Mission
              title={mission.title}
              content={mission.content}
              address={mission.address}
              number={mission.number}
              score={mission.score}
              status={mission.status}
              statusText={mission.statusText}
              volunteers={mission.volunteers}
              id={mission.id}
              key={mission.id}
              // missionReload={missionReload}
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
