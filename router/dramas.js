const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
    res.send("我是 /dramas 的根路徑");
});

router.get("/page", (req, res) => {
    res.render("dramas.html");
});

let readFilePromise = (dataPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, "utf8",  (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

// get / getDramaListData, 取得資料
router.get("/getDramaListData", async (req, res) => {
    let selectType = req.query.type;
    try {
        // console.log(abc);
        let data = await readFilePromise("./models/sample2.json");
        if (selectType === '全') {
            res.json(data);
        } else if (selectType === '其他') {
            let normalType = ['犯罪', '殭屍', '愛情', '政治']
            let filterData = data.filter(ele => !normalType.includes(ele["category"]))
            res.json(filterData);
        } else {
            let filterData = data.filter(ele => ele["category"] === selectType);
            res.json(filterData);
        }
         
    } catch(err) {
        // statusCode
        // 2xx -> 請求 ok
        // 3xx -> 請求 ok, 但資源換位置, response 會告訴你下一個位置
        // 4xx -> client 端問題
        // 5xx -> server 端問題
        res.status(500).json({message: "系統有問題！"});
    };

});

// post / createNewDramaData, 新增資料
router.post("/createNewDramaData", async (req, res) => {
    // 寫檔案進 sample2.json
    console.log("formData :", req.body);
    try {
        // 1. 讀取出此 Array
        let data = await readFilePromise("./models/sample2.json");

        // 2. 使用 .push
        data.push(req.body);

        // 3. 把資料寫進去
    } catch (err) {

    };
    
});

module.exports = router;