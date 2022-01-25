import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PList from "../components/PList";
import { API_URL } from "../config/blockColor";

const Player = () => {
  const [players, setPlayers] = useState([]);

  useEffect(async () => {
    let result = await axios.get(`${API_URL}/player`);
    // console.log("result", result.data);
    setPlayers(result.data);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Link to="/player/playerform" className="new">
        Add a new player
      </Link>
      <table>
        {players.map((value, i) => {
          return <PList key={value.id} value={value} />;
        })}
      </table>
    </div>
  );
};

export default Player;
