const express = require("express");
const router = express.Router();
const connection = require("../utilis/db");
const bcrypt = require("bcrypt");

const { body, validationResult } = require("express-validator");
const registerRules = [
  body("email").isEmail().withMessage("Email欄位請正確填寫"),
  body("password").isLength({ min: 6 }).withMessage("密碼長度不足6碼"),
  body("confirmpassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼不一致"),
];

// sign up
router.post("/signup", registerRules, async (req, res) => {
  let { name, email, password, confirmpassword } = req.body;
  // 1. 驗證前端傳回來的資料正不正確
  const validateError = validationResult(req); // 如果沒錯誤的話裡面會是空的
  if (!validateError.isEmpty()) {
    let error = validateError.array();
    return res.status(400).json({ code: "1100", result: error });
  }

  // 2. 該帳號是否已註冊
  try {
    let memberExist = await connection.queryAsync(
      "SELECT * FROM member WHERE email=? ",
      [email]
    );
    if (memberExist.length > 0) {
      return res.json({ code: "1101", message: "該email已註冊過" });
    }
  } catch (e) {
    res.json({ code: "9999", message: "請洽系統管理員" });
  }

  // 3. 密碼加密
  let hashPassword = await bcrypt.hash(password, 10);

  // 4. 建立新資料
  try {
    let newData = await connection.queryAsync(
      "INSERT INTO member (name, email, password) VALUES (?,?,?)",
      [name, email, hashPassword]
    );
    res.json({ code: "0001", message: "註冊成功" });
  } catch (e) {
    console.error(e);
    res.json({ code: "9999", message: "請洽系統管理員" });
  }
});

// log in
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  // 1. 比對帳號
  let member = await connection.queryAsync(
    "SELECT * FROM member WHERE email=?",
    [email]
  );
  console.log("member", member);
  if (member.length === 0) {
    // 表示這個email還沒建立過
    res.json({ code: "1102", message: "帳號或密碼錯誤" });
  }

  member = member[0]; // 因為資料庫抓出來的是一個陣列
  //   [
  //   RowDataPacket {
  //     id: 2,
  //     name: 'Eddie',
  //     email: 'eddie@test.com',
  //     password: '$2b$10$0XC/bY.nC.bbGqrYwbW0PeoyYb5MCsWFD.BiTT5dvmnlfQY5xFtC6'
  //   }
  // ]

  // 2. 比對密碼
  let memberPassword = await bcrypt.compare(password, member.password);
  if (!memberPassword) {
    res.json({ code: "1102", message: "帳號或密碼錯誤" });
  }

  // 3. 比對資料成功，寫入session
  let returnMember = {
    id: member.id,
    email: member.email,
    name: member.name,
  };
  req.session.user = returnMember; // 我要把這個物件的東西存進sessions資料夾

  res.json({ code: "0001", message: "登入成功", member: returnMember }); // 除了回傳成功之外，再傳我從資料庫拿的資料給前端
});

// 確認是否登入
router.get("/userinfo", async (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.json({ code: 1201, message: "尚未登入" });
  }
});

// log out
router.get("/logout", (req, res) => {
  req.session.user = null;

  res.json({ code: "0005", message: "登出成功" });
});

module.exports = router;
