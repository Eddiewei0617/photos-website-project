const express = require("express");
const router = express.Router();
const connection = require("../utilis/db");
const bcrypt = require("bcrypt");
const path = require("path");

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

// 處理從前端來的multipart form-data資料 (一樣要有中間件，才能讓後端讀懂)
const multer = require("multer"); // 專門處理multipart-formData形式的資料
const photoStorage = multer.diskStorage({
  // 把圖片檔存在哪裡
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  // 改使用者上傳的圖片檔名，
  // 原因一: 可能會有不同使用者的圖片同名的狀況
  // 原因二: 開發者好管理-統一
  filename: function (req, file, cb) {
    // console.log("filename", file);
    const ext = file.originalname.split(".").pop(); // 取附檔名
    cb(null, `member-${Date.now()}.${ext}`);
  },
});
const uploader = multer({
  storage: photoStorage,
  // 過濾檔案格式
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpg" && file.mimetype !== "image/png") {
      cb(new Error("不符合允許的檔案類型"), false);
    }
    // console.log("file", file);
    cb(null, true);
  },
  limits: {
    // 限制上傳檔案大小
    fileSize: 1024 * 1024,
  },
});

// sign up
// uploader 一定要放registerRules前面，因為要先讀懂才能過濾
router.post(
  "/signup",
  uploader.single("photo"),
  registerRules,
  async (req, res) => {
    // console.log("req.file", req.file);

    let { name, email, password, confirmpassword, photo } = req.body;
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

    let filename = req.file ? "/uploads/" + req.file.filename : "";
    // 4. 建立新資料
    try {
      let newData = await connection.queryAsync(
        "INSERT INTO member (name, email, password, photo) VALUES (?,?,?,?)",
        [name, email, hashPassword, filename]
      );
      res.json({ code: "0001", message: "註冊成功" });
    } catch (e) {
      console.error(e);
      res.json({ code: "9999", message: "請洽系統管理員" });
    }
  }
);

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
    photo: member.photo,
  };
  req.session.user = returnMember; // 我要把這個物件的東西存進sessions資料夾
  console.log("member", member);
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
