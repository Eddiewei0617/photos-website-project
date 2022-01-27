import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/blockColor";
import { useNavigate } from "react-router-dom";

function Nav({ userInfo }) {
  console.log("userInfo", userInfo);

  let navigate = useNavigate();
  async function handleLogout() {
    try {
      let req = await axios.get(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  function notLogin() {
    if (userInfo == null || userInfo.code === 1201) {
      alert("請先登入");
      navigate("/");
    }
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li onClick={notLogin}>
          <Link to="/player">Players</Link>
        </li>

        {userInfo == null || userInfo.code === 1201 ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        )}

        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
