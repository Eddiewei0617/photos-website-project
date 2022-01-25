import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/style.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Player from "./pages/Player";
import PlayerForm from "./pages/PlayerForm";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/player" element={<Player />} exact />
        <Route path="/player/playerform" element={<PlayerForm />} exact />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
