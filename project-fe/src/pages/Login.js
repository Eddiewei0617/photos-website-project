import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/blockColor";
import { useNavigate } from "react-router-dom";

function Login() {
  let [member, setMember] = useState({
    email: "",
    password: "",
  });

  function loginChange(e) {
    let newMember = { ...member };
    newMember[e.target.name] = e.target.value;
    setMember(newMember);
  }

  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post(`${API_URL}/auth/login`, member, {
        // 因為跨源，所以要設withCredentials來讓req cors 寫cookie
        withCredentials: true,
      });
      console.log("res", res); // 在res.data.member可以拿到 member: {id: 2, email: 'eddie@test.com', name: 'Eddie'}
      if (res.data.code === "0001") {
        await navigate("/player");
      } else {
        alert("登入失敗，請再次嘗試");
      }
    } catch (e) {
      alert("登入失敗，請再次嘗試");
      console.error("handleSubmit", e);
    }
  }
  return (
    <div>
      <main>
        <form action="" className="login" onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              value={member.email}
              onChange={loginChange}
              placeholder="Enter email"
              name="email"
            />
          </div>
          <br />
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              value={member.password}
              onChange={loginChange}
              placeholder="Password"
              name="password"
            />
          </div>
          <br />
          <button class="btn btn-primary">Log In</button>
        </form>
      </main>
    </div>
  );
}

export default Login;
