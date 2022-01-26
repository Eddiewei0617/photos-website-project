require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path"); // 可以自動幫你判斷路徑要斜哪一邊 /\
const expressSession = require("express-session");
const fileStore = require("session-file-store")(expressSession);
let playerRouter = require("./routers/player");
let authRouter = require("./routers/auth");

app.use(
  cors({
    // 因為要開放跨源寫cookie，所以必須要設好源
    origin: ["http://localhost:3000"],
    // 允許跨源存好cookie
    credentials: true,
  })
);
// 要拿到前端註冊時的物件資料，需使用中間件，才可以讀到body的資料

app.use(
  expressSession({
    // store 定要把session存在哪裡，預設是memory，可是缺點是，即便程式碼有小改，使用者也會被登出
    store: new fileStore({ path: path.join(__dirname, "..", "sessions") }), // 串起來變成 project-be/../sessions
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: true }));
// 使用此中間件才能解析的到json格式
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Homepage");
});

// player api 的 router
app.use("/api/player", playerRouter);

// signup and signin's auth router
app.use("/api/auth", authRouter);

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
