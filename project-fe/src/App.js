import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/style.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/about" element={<About />} exact />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
