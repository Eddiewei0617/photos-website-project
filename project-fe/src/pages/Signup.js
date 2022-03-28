import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/blockColor";
import { useNavigate } from "react-router-dom";

function Signup() {
  let [member, setMember] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    photo: "",
  });

  function signupChange(e) {
    let newMember = { ...member };
    newMember[e.target.name] = e.target.value;
    setMember(newMember);
  }

  function signupUpload(e) {
    let newMember = { ...member };
    newMember.photo = e.target.files[0];
    setMember(newMember);
  }

  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // 由於要傳圖片的關係，json格式不能傳檔案，我們得用formData的形式傳送
      let formData = new FormData();
      formData.append("name", member.name);
      formData.append("email", member.email);
      formData.append("password", member.password);
      formData.append("confirmpassword", member.confirmpassword);
      formData.append("photo", member.photo);
      console.log("formData", formData);
      let req = await axios.post(`${API_URL}/auth/signup`, formData);
      await navigate("/login");
    } catch (e) {
      console.error("handleSubmit", e);
    }
  }

  return (
    <div>
      <main>
        <form action="" onSubmit={handleSubmit} className="signup">
          <div className="form-group">
            <label for="exampleUsername">Username</label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={member.name}
              onChange={signupChange}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={member.email}
              onChange={signupChange}
              placeholder="Enter email"
              name="email"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={member.password}
              onChange={signupChange}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Confirm Password"
              name="confirmpassword"
              value={member.confirmpassword}
              onChange={signupChange}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label for="">Photo</label>
            <input
              type="file"
              className="form-control"
              name="photo"
              onChange={signupUpload}
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </main>
    </div>
  );
}

export default Signup;
