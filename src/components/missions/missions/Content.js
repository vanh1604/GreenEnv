import React from "react";
import "./Content.css";
import Mission from "./Mission";

import { useState, useEffect } from "react";
import {
  colRefUsers,
  colRefUserMission,
  colRefMissions,
} from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";

const Content = (props) => {
  const [missions, setMissions] = useState([]);
  const [userMissionLinks, setUserMissionLinks] = useState([]);
  const [userDoc, setUserDoc] = useState({});
  const [userMissionLink, setUserMissionLink] = useState({});

  let tmp = [],
    tmp2 = [];

  useEffect(() => {
    const getMissions = async () => {
      const data = await getDocs(colRefMissions);
      setMissions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMissions();

    const getUserMissionLinks = async () => {
      const data = await getDocs(colRefUserMission);
      setUserMissionLinks(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getUserMissionLinks();

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
  }, []);

  // const getUserMissionLink = async (mission) => {
  //   // console.log(mission);
  //   const data = await getDocs(colRefUserMission);
  //   data.docs.forEach((doc) => {
  //     // console.log(doc.data().userEmail, userDoc.email);
  //     // console.log(doc.data().missionId, mission.id);
  //     if (
  //       doc.data().userEmail === userDoc.email &&
  //       doc.data().missionId == mission.id
  //     ) {
  //       setUserMissionLink({ ...doc.data(), id: doc.id });
  //       // console.log(userMissionLink);
  //       return;
  //     }
  //   });
  // };

  const { user } = UserAuth();

  let cnt = 0;

  return (
    <div>
      {userMissionLinks.map((userMissionLink) => {
        //does not work!!!
        if (userMissionLink.userEmail == userDoc.email) {
          return missions.map((mission) => {
            if (
              (mission.volunteers.includes(userDoc.email) ||
                (mission.status !== "done" &&
                  mission.volunteersLength < mission.volunteersRequired)) &&
              mission.id == userMissionLink.missionId &&
              userMissionLink.userStatus !== "done"
            ) {
              tmp = [...tmp, mission.id];
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
                  userStatus={userMissionLink.userStatus}
                  userStatusText={userMissionLink.userStatusText}
                  userRole={userDoc.role}
                  // volunteer={mission.volunteer}
                  volunteers={mission.volunteers}
                  id={mission.id}
                  key={mission.id}
                  // missionReload={missionReload}
                />
              );
            }
          });
        }
      })}
      {userMissionLinks.map((userMissionLink) => {
        //does not work!!!
        return missions.map((mission) => {
          if (
            (mission.volunteers.includes(userDoc.email) ||
              (mission.status !== "done" &&
                mission.volunteersLength < mission.volunteersRequired)) &&
            mission.id == userMissionLink.missionId &&
            userMissionLink.userStatus === "done"
          ) {
            tmp2 = [...tmp2, mission.id];
            cnt++;
            {
              /* return (
              <Mission
                title={mission.title}
                content={mission.content}
                address={mission.address}
                number={mission.number}
                score={mission.score}
                status={mission.status}
                statusText={mission.statusText}
                userStatus={userMissionLink.userStatus}
                userStatusText={userMissionLink.userStatusText}
                // volunteer={mission.volunteer}
                userRole={userDoc.role}
                volunteers={mission.volunteers}
                volunteersRequired={mission.volunteersRequired}
                id={mission.id}
                key={mission.id}
                // missionReload={missionReload}
              />
            ); */
            }
          }
        });
      })}
      {/* {missions.map((mission) => {
        if (tmp.includes(mission.id)) {
          return (
            <Mission
              title={mission.title}
              content={mission.content}
              address={mission.address}
              number={mission.number}
              score={mission.score}
              status={mission.status}
              statusText={mission.statusText}
              userStatus={null}
              userStatusText={null}
              volunteer={mission.volunteer}
              id={mission.id}
              key={mission.id}
              // missionReload={missionReload}
            />
          );
        }
      })} */}
      {missions.map((mission) => {
        if (
          (mission.volunteers.includes(userDoc.email) ||
            (mission.status !== "done" &&
              mission.volunteersLength < mission.volunteersRequired)) &&
          !tmp.includes(mission.id) &&
          !tmp2.includes(mission.id)
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
              userStatus={null}
              userStatusText={null}
              // volunteer={mission.volunteer}
              userRole={userDoc.role}
              volunteers={mission.volunteers}
              volunteersRequired={mission.volunteersRequired}
              id={mission.id}
              key={mission.id}
              // missionReload={missionReload}
            />
          );
        }
      })}

      {userMissionLinks.map((userMissionLink) => {
        //does not work!!!
        return missions.map((mission) => {
          if (tmp2.includes(mission.id)) {
            return (
              <Mission
                title={mission.title}
                content={mission.content}
                address={mission.address}
                number={mission.number}
                score={mission.score}
                status={mission.status}
                statusText={mission.statusText}
                userStatus={userMissionLink.userStatus}
                userStatusText={userMissionLink.userStatusText}
                // volunteer={mission.volunteer}
                userRole={userDoc.role}
                volunteers={mission.volunteers}
                volunteersRequired={mission.volunteersRequired}
                id={mission.id}
                key={mission.id}
                // missionReload={missionReload}
              />
            );
          }
        });
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

// import React from "react";
// import "./Content.css";
// import Mission from "./Mission";

// import { useState, useEffect } from "react";
// import {
//   colRefUsers,
//   colRefUserMission,
//   colRefMissions,
// } from "../../../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { UserAuth } from "../../../context/AuthContext";

// const Content = (props) => {
//   const [missions, setMissions] = useState([]);
//   const [userMissionLinks, setUserMissionLinks] = useState([]);
//   const [userDoc, setUserDoc] = useState({});
//   const [userMissionLink, setUserMissionLink] = useState({});

//   let tmp = [];

//   useEffect(() => {
//     const getMissions = async () => {
//       const data = await getDocs(colRefMissions);
//       setMissions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };
//     getMissions();

//     const getUserMissionLinks = async () => {
//       const data = await getDocs(colRefUserMission);
//       setUserMissionLinks(
//         data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//       );
//     };
//     getUserMissionLinks();

//     const getUserDoc = async () => {
//       const data = await getDocs(colRefUsers);
//       data.docs.forEach((doc) => {
//         if (doc.data().email === localStorage.email) {
//           setUserDoc({ ...doc.data(), id: doc.id });
//           return;
//         }
//       });
//     };
//     if (user) getUserDoc();
//   }, []);

//   const getUserMissionLink = async (mission) => {
//     // console.log(mission);
//     const data = await getDocs(colRefUserMission);
//     data.docs.forEach((doc) => {
//       // console.log(doc.data().userEmail, userDoc.email);
//       // console.log(doc.data().missionId, mission.id);
//       if (
//         doc.data().userEmail === userDoc.email &&
//         doc.data().missionId == mission.id
//       ) {
//         setUserMissionLink({ ...doc.data(), id: doc.id });
//         // console.log(userMissionLink);
//         return;
//       }
//     });
//   };

//   const { user } = UserAuth();

//   let cnt = 0;

//   return (
//     <div>
//       {userMissionLinks.map((userMissionLink) => { //does not work!!!
//         missions.forEach((mission) => {
//           console.log("se")
//           {/* return <div className="abc">abc</div> */}
//           /* console.log(
//             "hello"
//           );
//           if (mission.id == userMissionLink.missionId) {
//             console.log("dead")
//             tmp = [...tmp, mission.id];
//             cnt++;
//             return (

//               <div> test</div>
//               /* <Mission
//                 title={mission.title}
//                 content={mission.content}
//                 address={mission.address}
//                 number={mission.number}
//                 score={mission.score}
//                 status={mission.status}
//                 statusText={mission.statusText}
//                 userStatus={userMissionLink.status}
//                 userStatusText={userMissionLink.statusText}
//                 volunteer={mission.volunteer}
//                 id={mission.id}
//                 key={mission.id}
//                 // missionReload={missionReload}
//               /> */
//             //);
//           //} */}
//         });
//       })}
//       {/* {missions.map((mission) => {
//         if (tmp.includes(mission.id)) {
//           return (
//             <Mission
//               title={mission.title}
//               content={mission.content}
//               address={mission.address}
//               number={mission.number}
//               score={mission.score}
//               status={mission.status}
//               statusText={mission.statusText}
//               userStatus={null}
//               userStatusText={null}
//               volunteer={mission.volunteer}
//               id={mission.id}
//               key={mission.id}
//               // missionReload={missionReload}
//             />
//           );
//         }
//       })} */}
//       {missions.map((mission) => {
//         if (!tmp.includes(mission.id)) {
//           return (
//             <Mission
//               title={mission.title}
//               content={mission.content}
//               address={mission.address}
//               number={mission.number}
//               score={mission.score}
//               status={mission.status}
//               statusText={mission.statusText}
//               userStatus={null}
//               userStatusText={null}
//               volunteer={mission.volunteer}
//               id={mission.id}
//               key={mission.id}
//               // missionReload={missionReload}
//             />
//           );
//         }
//       })}

//       {cnt == 0 ? (
//         <div className="missions--empty_notification">
//           Chưa có nhiệm vụ nào, bạn hãy quay lại sau nhé!
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Content;
