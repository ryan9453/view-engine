const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const app = express();
const portNum = 8088;

// [Views][1] 設定模板引擎(解析 html 檔, 讓 express 看懂 html 程式)
// hbs -> handlebars 為一種模板引擎
// 另外一種熱門模板引擎 -> pug 
app.engine("html", hbs.__express);

// [Views][2] 設定模板(template)位置
app.set("views", path.join(__dirname, "application", "views"));

// [Views][3] 設定靜態檔的位置（讀取 *.css / *.js / *.jpg / *.png / *.mp4 / ...）
// --> 處理 靜態檔 相關 requests
app.use(express.static(path.join(__dirname, "application")));

// [Body-Parser][1] 解析 application/json
app.use(bodyParser.json());

// [Body-Parser][2] 解析 applictaion/ x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extend: false,    // 是否用額外套件解析字串
  limit: "1mb",     // 限制參數資料大小 
  parameterLimit: "10000",  // 限制參數個數
}));

const dramasRouter = require("./router/dramas.js");
const aboutRouter = require("./router/about.js");

app.get("/" , (req,res)=>{
  // [4] 使用 .render（渲染）回傳 html 頁面
  res.render("index.html");
  console.log('資料夾名稱 :', __dirname);
});

// HTML / Css / 前端 Js 教學
app.get("/testqq", (req, res) => {
  res.render("template.html");
});

app.get("/data", (req, res) => {
  res.json({name : "jeff", age : 18, message : "好想睡"});
});


app.use("/dramas", dramasRouter);
app.use("/about", aboutRouter);

app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
