import React from "react";
import Main from "./components/homepage/Main";
import Header from "./components/common-components/Header";
import Footer from "./components/common-components/Footer";
import About from "./components/about/About";
import Login from "./components/login/Login";
import Content from "./components/missions/missions/Content";
import Activity from "./components/Activity/Activity";
import Contact from "./components/contact/Contact";
import MissionBoard from "./components/mission-board/MissionBoard";
import { Route, Routes } from "react-router";
import User from "./components/user/User";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UserEdit from "./components/user/UserEdit";
import MissionDetails from "./components/missions/missions2/MissionDetails";
import Error from "./components/error/Error";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { colRefMissions, colRefUsers } from "./firebase";
import Exchange from "./components/exchange/Exchange";

const App = () => {
  const [missions, setMissions] = useState([]);
  const [userDoc, setUserDoc] = useState({});
  useEffect(() => {
    const getUserDoc = async () => {
      const data = await getDocs(colRefUsers);
      data.docs.forEach((doc) => {
        if (doc.data().email === localStorage.email) {
          setUserDoc({ ...doc.data(), id: doc.id, key: doc.id });
          return;
        }
      });
    };
    getUserDoc();

    const getMissions = async () => {
      const data = await getDocs(colRefMissions);
      setMissions(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id, key: doc.id }))
      );
    };

    getMissions();
  }, []);

  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route
            exact
            path="*"
            element={
              <>
                <Header />
                <Error />
                <Footer />
              </>
            }
          />
          <Route path="/" element={<Main />} />
          <Route path="/signin/*" element={<Login />} />
          <Route
            exact
            path="/user"
            element={
              <ProtectedRoute>
                <Header />
                <User role="user" userRole={userDoc.role} />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin"
            element={
              <ProtectedRoute>
                <Header />
                <User role="admin" userRole={userDoc.role} />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/edit"
            element={
              <ProtectedRoute>
                <Header />
                <UserEdit role="user" userRole={userDoc.role} />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit"
            element={
              <ProtectedRoute>
                <Header />
                <UserEdit role="admin" userRole={userDoc.role} />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/user/missions"
            element={
              <ProtectedRoute>
                <Header />
                <MissionBoard
                  role="user"
                  userRole={userDoc.role}
                  headline="BẢNG NHIỆM VỤ"
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          {/* <Route
            exact
            path="/admin/missions"
            element={
              <ProtectedRoute>
                <Header />
                <MissionBoard role="admin" userRole={userDoc.role} /> <Footer />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/about"
            element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/exchange"
            element={
              <>
                <Header />
                <Exchange />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/missions"
            element={
              <>
                <Header />
                <Content userRole={userDoc.role} />
                <Footer />
              </>
            }
          />

          {/* {userMissionLinks.map((userMissionLink) => {
            //does not work!!!
            return missions.map((mission) => {
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
                  volunteer={mission.volunteer}
                  id={mission.id}
                  key={mission.id}
                  // missionReload={missionReload}
                />
              );
            });
          })} */}

          {missions.map((mission) => {
            return (
              <Route
                path={`/missions/details/${mission.id}`}
                element={
                  <>
                    <Header />
                    <MissionDetails
                      title={mission.title}
                      number={mission.number}
                      address={mission.address}
                      content={mission.content}
                      score={mission.score}
                      duration={mission.duration}
                      status={mission.status}
                      volunteers={mission.volunteers}
                      statusText={mission.statusText}
                      id={mission.id}
                      key={mission.id}
                    />
                    <Footer />
                  </>
                }
              />
            );
          })}
          <Route
            path="/activity"
            element={
              <>
                <Header />
                <Activity />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/error"
            element={
              <>
                <Header />
                <Error />
                <Footer />
              </>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
