const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const Promise = require("bluebird");
require("dotenv").config();

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});
// 利用 bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection);

// 準備取得player的API，列表：全部資料
router.get("/", async (req, res) => {
  let allPlayers = await connection.queryAsync("SELECT * FROM player");
  res.json(allPlayers);
});

router.post("/insert", async (req, res) => {
  let { number, name, photo, team, age } = req.body;
  try {
    let insertData = await connection.queryAsync(
      "INSERT INTO player (number, name, photo, team, age) VALUES (?,?,?,?,?)",
      [number, name, photo, team, age]
    );
    res.json({ code: 200, messae: "Success to insert" });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
