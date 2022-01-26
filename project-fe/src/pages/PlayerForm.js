import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useHistory改成這個了
import { API_URL } from "../config/blockColor";

function PlayerForm() {
  const [playerInfo, setPlayerInfo] = useState({
    number: "",
    name: "",
    photo: "",
    team: "",
    age: "",
  });

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    // 將playerInfo這個object解構之後再插入新的值
    setPlayerInfo((current) => {
      return { ...current, [name]: value };
    });
  }

  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let submitData = await axios.post(`${API_URL}/player/insert`, playerInfo);
      console.log("submitData", submitData);
    } catch (e) {
      console.log("submit's error: ", e);
    }
    await navigate("/player");
  }

  return (
    <form action="" className="insertForm" onSubmit={handleSubmit}>
      <div>
        <label>Number </label>
        <input
          type="number"
          name="number"
          value={playerInfo.number}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Name </label>
        <input
          type="text"
          name="name"
          value={playerInfo.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Photo </label>
        <textarea
          type="text"
          name="photo"
          value={playerInfo.photo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Team </label>
        <select
          name="team"
          value={playerInfo.team}
          onChange={handleChange}
          required
        >
          <option>RealMadrid</option>
          <option>Barcelona</option>
          <option>Paris</option>
        </select>
      </div>
      <div>
        <label>Age </label>
        <input
          type="number"
          name="age"
          value={playerInfo.age}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="">
        Submit
      </button>
    </form>
  );
}

export default PlayerForm;
