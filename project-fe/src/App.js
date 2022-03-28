import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/style.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Player from "./pages/Player";
import PlayerForm from "./pages/PlayerForm";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { getUserInfo } from "./config/getAPI";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    getUserInfo(setUserInfo);
  }, []);

  return (
    <div className="App">
      <Nav userInfo={userInfo} />
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/player" element={<Player />} exact />
        <Route path="/player/playerform" element={<PlayerForm />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} exact />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
