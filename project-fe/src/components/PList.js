import React from "react";
import { TEAM_COLOR } from "../config/blockColor";

function PList({ value }) {
  //   console.log("value", value);
  return (
    <div className="tableWidth">
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Photos</th>
          <th>Team</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody className={`${TEAM_COLOR[value.team]}`}>
        <tr>
          <td>{value.number}</td>
          <td>{value.name}</td>
          <td>
            <div className="playerPic">
              <img src={`${value.photo}`} alt="" />
            </div>
          </td>
          <td>{value.team}</td>
          <td>{value.age}</td>
        </tr>
      </tbody>
    </div>
  );
}

export default PList;
