import React from "react";

const Picture = ({ data }) => {
  console.log(data);
  return (
    <div className="picture">
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
