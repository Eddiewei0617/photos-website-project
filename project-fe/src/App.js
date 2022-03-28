import React, { useState, useEffect, useReducer } from "react";
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
import UserContext from "./config/useContext";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo(setUserInfo);
  }, []);
  // console.log("userInfo", userInfo);

  const [name, setName] = useState("");

  function reducer(state, action) {
    switch (action.type) {
      case "plus":
        return state + action.value;
      case "minus":
        return state - action.value;
    }
  }

  // 有點像是useState，只是後面useReducer(reducer函式, state初始值)
  const [ageState, ageDispatch] = useReducer(reducer, 27);

  return (
    <div className="App">
      <Nav userInfo={userInfo} />
      <Routes>
        <Route
          path="/"
          element={
            <UserContext.Provider
              value={{
                name: name,
                setName: setName,
                age: ageState,
                setAge: ageDispatch,
              }}
            >
              <Homepage />
            </UserContext.Provider>
          }
          exact
        />
        <Route path="/player" element={<Player userInfo={userInfo} />} exact />
        <Route path="/player/playerform" element={<PlayerForm />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} exact />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
