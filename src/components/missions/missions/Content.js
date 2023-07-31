import React from "react";
import Mission from "./Mission";

import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";

const Content = () => {
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

  return (
    <div>
      {missions.map((mission, key = mission.id) => {
        if (mission.status === "not accepted" || mission.volunteer === user.email)
          return (
            <Mission
              title={mission.title}
              content={mission.content}
              address={mission.address}
              number={mission.number}
              point={mission.point}
              status={mission.status}
              id={mission.id}
            />
          );
      })}
    </div>
  );
};

export default Content;

// import React from 'react';
// import Mission from './Mission';

// const Content = () => {
//   return (
//     <main className='content'>
//       <Mission />
//       <Mission />
//       <Mission />
//     </main>
//   );
// };

// export default Content;
