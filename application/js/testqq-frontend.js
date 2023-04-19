// alert("嗨嗨 , 我是 .js 檔~~~");

// 等 HTML 上的標籤完成，才開始執行
// jQuery (Javascript 語法糖)
// 進階 -> Vue.js / React.js / Angular.js
$(function() {
    console.log("嗨嗨 , 我是 .js 檔~~~");

    // 透過 id 修改文字
    // $("#wording").text(" Js 修改文字～～～");

    // 透過 id 修改文字
    setTimeout(()=>{
        $("#wording").text(" Js 修改文字～～～");
    }, 1000);


    // 透過 class 綁定 click 事件 (事件聆聽)
    $(".test-btn").click(() => {
        alert("按到按鈕！");

        // 目標：前後端串接
        // 當 button 被 click 時，向後端發 request 
        // 取得 Object
        //// ajax -> 非同步請求
        $.ajax({
            url  : "/data",
            type : "GET",
        })
        .then( res => {
            // 發 request 成功
            console.log(res);

            // 接到 response 後, 往後長 div 出來
            $("#wording").after(`<div> ${ res["message"] } </div>`);
        })
        .catch( err => {
            // 發 request 失敗
            console.log(err);
        });
    });

});