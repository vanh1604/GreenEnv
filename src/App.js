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
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const App = () => {
  const [missions, setMissions] = useState([]);
  const usersCollectionRef = collection(db, "missions");
  useEffect(() => {
    const getMissions = async () => {
      const data = await getDocs(usersCollectionRef);
      setMissions(
        data.docs.map((doc, key = doc.id) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getMissions();
  }, []);

  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin/*" element={<Login />} />
          <Route
            path="/user/edit"
            element={
              <ProtectedRoute>
                <Header />
                <UserEdit />
                <Footer />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/user/edit" element={<ProtectedRoute><AccountModify /></ProtectedRoute>} /> */}
          <Route
            exact
            path="/user"
            element={
              <ProtectedRoute>
                <Header />
                <User />
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
                <MissionBoard /> <Footer />
              </ProtectedRoute>
            }
          />
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
            exact
            path="/missions"
            element={
              <>
                <Header />
                <Content />
                <Footer />
              </>
            }
          />
          {missions.map((mission, key = mission.id) => {
            return (
              <Route
                path={`/missions/details/${mission.id}`}
                element={
                  <>
                    {/* <Header /> */}
                    <MissionDetails
                      title={mission.title}
                      number={mission.number}
                      address={mission.address}
                      content={mission.content}
                      point={mission.point}
                      duration={mission.duration}
                      id={mission.id}
                    />
                    {/* <Footer /> */}
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
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
