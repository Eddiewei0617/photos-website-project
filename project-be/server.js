const express = require("express");
const app = express();
const cors = require("cors");
let playerRouter = require("./routers/player");

app.use(cors());
// 要拿到前端註冊時的物件資料，需使用中間件，才可以讀到body的資料
app.use(express.urlencoded({ extended: true }));
// 使用此中間件才能解析的到json格式
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Homepage");
});

// player api 的 router
app.use("/api/player", playerRouter);

// 處理錯誤 (server端)
app.use((err, req, res, next) => {
  res.status(500).send("Something is broken. We will fix it soon.");
});
// 處理錯誤 (client端))
app.get("/*", (req, res) => {
  res.status(404).send("404 not found");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
