import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PList from "../components/PList";
import { API_URL, FILE_URL } from "../config/blockColor";

const Player = ({ userInfo }) => {
  const [players, setPlayers] = useState([]);

  useEffect(async () => {
    let result = await axios.get(`${API_URL}/player`, {
      // 所有需要用到cookie裡 sid，就需要用withCredentials
      withCredentials: true,
    });
    setPlayers(result.data);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      {userInfo && (
        <div className="userPhoto">
          <img src={`${FILE_URL}${userInfo.photo}`} alt="" />
        </div>
      )}

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
