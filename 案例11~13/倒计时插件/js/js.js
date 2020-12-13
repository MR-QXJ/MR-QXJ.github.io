window.countDown = function (json) {
    var d = json.data.split(" ");//拆分为年月日和时分秒两个
    var d1 = d[0].split(/[\/\.-]/g);
    var d2 = d[1].split(/[\.:]/g);
    var n,y,r,s,f,m;
    n = d1[0];
    y = d1[1] - 1;/*月份最低为0，代表1月*/
    r = d1[2];
    s = d2[0];
    f = d2[1];
    m = d2[2];
    var targetDate = new Date(n,y,r,s,f,m);
    var currentDate = new Date();
    var minus = targetDate - currentDate;
    if(minus < 0){
        alert("只能倒计时将来的时间！");
        return false;
    }
    count();
    var timer = setInterval(count,1000);
    function count() {
        currentDate = new Date();//这里获取的是用户电脑上的时间
        //    Ajax获取服务器时间
        // var ajax;
        // try {
        //     ajax = new XMLHttpRequest();
        // }catch (e) {
        //     ajax = new ActiveXObject("Microsoft.XMLHttp");/*ie8没有 XMLHttpRequest*/
        // }
        // ajax.open("打开方式get或post","文件路径",是否异步);
        // ajax.send();
        // ajax.onreadystatechange = function(){ //状态改变时执行
        //     if(ajax.readystate === 4){ //请求成功
        //         if(ajax.status >= 200 && ajax.status < 300){ //访问成功没有错误
        //             ajax.getResponseHeader("Date"); /*到这一步就能获取到服务器的时间，传server获取服务器信息*/
        //         }
        //     }
        // };
        minus = targetDate - currentDate;
        var mm = addZero(parseInt(minus / 1000 % 60));
        var mf = addZero(parseInt(minus / 1000 /60 % 60));
        var ms = addZero(parseInt(minus / 1000 / 60 / 60)); /*就用时分秒倒计时不%24了*/
        // var ms =addZero( parseInt(minus / 1000 / 60 / 60 % 24));
        // var mr = parseInt(minus / 1000 / 60 / 60 / 24 % 30); 每个月这里假定30
        // var my = parseInt(minus / 1000 / 60 / 60 / 24 / 30 % 12);
        // var mn = parseInt(minus / 1000 / 60 / 60 / 24 / 30 / 12);
        json.show && json.show(ms,mf,mm);
        if(mm == 0 && mf == 0 && ms == 0){
            clearInterval(timer);
            json.end();
            return false;
        }
    }
};
function addZero(num) {
    return ("00" + num).substr(-2);
}
