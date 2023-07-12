import React from "react";
import Main from "./components/homepage/Main";
import Header from "./components/common-components/Header";
import Footer from "./components/common-components/Footer";
// import About from "./components/about/About";
import Login from "./components/login/Login";
import Content from "./components/missions/missions/Content";
import Contact from "./components/contact/Contact";
// import AccountModify from "./components/account-modify/AccountModify";
// import MissionBoard from "./components/mission-board/MissionBoard";
import { Route, Routes } from "react-router";
import User from "./components/user/User";
// import SignIn from "./components/login/SignIn/SignIn";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      {/* style={{paddingTop:"96px"}} */}
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin/*" element={<Login />} />
          <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route
            path="/missions"
            element={
              <>
                <div style={{ paddingTop: "96px" }}>
                  <Header />
                </div>
                <Content />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <div style={{ paddingTop: "96px" }}>
                  <Header />
                </div>
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
