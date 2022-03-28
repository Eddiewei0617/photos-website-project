import React, { useEffect } from "react";
import UserContext from "../config/useContext";

const Picture = ({ data }) => {
  const userName = React.useContext(UserContext);
  useEffect(() => {
    userName.setName("Eddie");
  }, []);
  function handlePlus() {
    userName.setAge({ type: "plus", value: 1 });
  }
  function handleMinus() {
    userName.setAge({ type: "minus", value: 1 });
  }
  return (
    <div className="picture">
      <h1>
        {userName.name} is {userName.age} years old.
      </h1>
      <button onClick={handlePlus}>++++++</button>
      <button onClick={handleMinus}>------</button>
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt="" />
      </div>
      <p className="downloadBlock">
        Download Image:{" "}
        <a
          className="downloadButton"
          target="_blank"
          href={data.src.large}
          rel="noreferrer"
        >
          Click Here
        </a>
      </p>
    </div>
  );
};

export default Picture;
