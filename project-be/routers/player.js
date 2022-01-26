const express = require("express");
const router = express.Router();
require("dotenv").config();
const connection = require("../utilis/db");

// 準備取得player的API，列表：全部資料
router.get("/", async (req, res) => {
  if (req.session.user) {
    let allPlayers = await connection.queryAsync("SELECT * FROM player");
    res.json(allPlayers);
  } else {
    res.json({ code: "1103", message: "尚未登入" });
  }
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
