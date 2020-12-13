//刚初始化时点击btn会出现不能拖动的情况
$(function () {
    //初始化3d样式
    var $main = $("#main");
    var len = 5 * 5 * 5;
    var timer;
    (function () {
        init();
        //随机初始化li的函数
        function init() {
           for(var i = 0; i<len; i++){
               var x = (Math.random()-0.5)*5000;
               var y = (Math.random()-0.5)*5000;
               var z = (Math.random()-0.5)*5000;
               var $li = $("<li><p class='title'>Js</p><p class='author txt'>QXJ</p><p class='time txt'>2019.08.16</p></li>");
               $main.append($li);
               $li.css({
                   "transform": "translate3d(" + x + "px," + y + "px," + z + "px)"
               });
           }
           timer = setTimeout(function () {  //页面加载后一秒
               $("#btns").css({"transform": "scale(1)","opacity": 1});/*显示按钮动画*/
               grid();  /*开始排序网格*/
               clearTimeout(timer);
           },1000)
        }
        //排序所有li网格的函数
        function grid() {
            var x = 500, y = 500, z = 800;
                $("#main>li").each(function (index,ele) {
                    var moveX = (-2 + (index % 25) % 5) * x;  //因为原点在中间，左上移两个位置开始是第一个li，每过五个水平回到第一个的位置。
                    var moveY = (-2 + parseInt((index % 25) / 5)) * y; //每过五个增加一次垂直位置，而且每25个为一页，水平和垂直的位置要回到第一个
                    var moveZ = (-2 + parseInt(index / 25)) * z;  //每25个增加一次Z轴深度
                    $(ele).css({
                        "transform": "translate3d(" + moveX + "px," + moveY + "px," + moveZ + "px)",
                        "transition": "4s ease-out"
                    });
                });
        }
        //螺旋动画函数
        function helix() {
            var $lis = $("#main>li");
            $lis.each(function (index,ele) {
                var roY = index*10, midY =Math.floor($lis.length/2);
                var moveY = (-midY+index) * 10;
                $(ele).css({
                    "transform": "rotateY("+roY+"deg) translateY("+ moveY+ "px) translateZ(800px)",
                    "transition": "4s ease-in-out"
                });
            });
        }
        //table方式函数
        function table() {
            var x1 = 160,y1 = 200;//每一份位移的长度
            var fX = -9 * x1 + 60;/*第一个位置的X*/
            var fY = -4 * y1;/*第一个位置的Y*/
            var pY,pX,tX,tY;
            var arr = [
                {x:fX,y:fY},
                {x:fX+17*x1,y:fY},
                {x:fX , y:fY+y1 },
                {x:fX+x1 , y:fY+y1},
                {x:fX+12*x1 , y:fY+y1 },
                {x:fX+13*x1 , y:fY+y1 },
                {x:fX+14*x1 , y:fY+y1 },
                {x:fX+15*x1 , y:fY+y1 },
                {x:fX+16*x1 , y:fY+y1 },
                {x:fX+17*x1 , y:fY+y1 },
                {x:fX , y:fY+y1*2 },
                {x:fX+x1 , y:fY+y1*2},
                {x:fX+12*x1 , y:fY+y1*2 },
                {x:fX+13*x1 , y:fY+y1*2 },
                {x:fX+14*x1 , y:fY+y1*2 },
                {x:fX+15*x1 , y:fY+y1*2 },
                {x:fX+16*x1 , y:fY+y1*2 },
                {x:fX+17*x1 , y:fY+y1*2 }
            ];
            $("#main>li").each(function (index) {
                if(index<18){
                    tX = arr[index].x;
                    tY = arr[index].y;
                }else{
                    pY = parseInt((index+18)/18)+1;  /*每18个位一行，一行内y不会变,为使18个之后位置不会覆盖前面，index要加18，同样由于index从0开始，要加1*/
                    pX = (index+18) % 18;   /* 每一行18个后x位置回到初始*/
                    tX = fX + pX * x1;
                    tY = fY + pY * y1;
                    console.log(1);
                }
                $(this).css({
                    "transform": "translate("+tX+"px,"+tY+"px)"
                })
            });
        }
        //sphere动画函数
        function sphere() {
            var arr = [1,5,7,10,12,16,22,15,14,9,8,5,1];
            var len = arr.length;
            var rX = 180 / len;//每一份旋转的度数
            var fX = 90;  //从最顶端开始
            $("#main>li").each(function (index,ele) {
                var sum =0;
                var num,$index;/*遍历求第几个li用到*/
                for(var i = 0;i < len;i++){
                    sum += arr[i];
                    if(sum >= index+1) {  /*当前li在index这一排*/
                        $index = i;  //保存行数
                        num = arr[i] - (sum - index);  /*num为这一行的第几个*/
                        break;  //必须要跳出循环
                    }
                }
                var x = $index % 2 === 0 ? fX + rX * $index : fX - rX * $index;
                var y = num * (360 / arr[$index]);  /*这一行的第几个乘这一行每份的度数*/
                console.log(360 / arr[$index]);
                var z = 0;
                if(x > 90 && x< 270){
                    z = 180;     //绕Z轴旋转防止文字倒向
                }
                $(ele).css({
                    "transform": "rotateY("+y+"deg) rotateX("+x+"deg) rotateZ("+z+"deg) translateZ(800px)"/*注意先Y轴旋转，再X轴旋转，否则会重叠*/
                });
            })
        }
        //点击按钮切换排列方式
        var sortAll = {
            "0": table,
            "1": sphere,
            "2": helix,
            "3": grid
        };
        var $btn = $("#btns>li");
        $btn.on("click",function () {
            var index = $(this).index();
            sortAll[index]();
        });
    }());
//各事件
    (function () {
        var nowX, prevX, differX = 0, nowY, prevY, differY = 0;
        var roX = 0, roY = 0, tZ = -2000;
        var timer1 , timer2;
        var board = $("#board");
        var frame = $(".frame");
        var leftAll = $("#left-all");
        //鼠标拖动
        $(document).on("mousedown", function (e) {
            var eve = e || window.event;
            prevX = eve.clientX;
            prevY = eve.clientY;
            clearTimeout(timer1);
            $(this).on("mousemove", function (e) {
                var eve = e || window.event;
                nowX = eve.clientX;
                nowY = eve.clientY;
                differX = nowX - prevX;
                differY = nowY - prevY;
                roX -= differY * 0.3;      //若ul要写宽高才会默认以ul为中心旋转
                roY += differX * 0.3;       /*rotate是以轴为中心，因此鼠标水平移动ul要让Y轴旋转*/
                prevX = nowX;
                prevY = nowY;
                $main.css({"transform": "translateZ("+tZ+"px) rotateX(" + roX + "deg) rotateY(" + roY + "deg)"});/*要加上translateZ，防止外部样式表的此内容被覆盖*/
            });
        }).on("mouseup", function () {
            $(this).off("mousemove");
             timer1 = setInterval(function () {   //停下的缓动效果
                 if(Math.abs(differX) < 0.5 && Math.abs(differY) < 0.5){
                    clearTimeout(timer1);
                    return false;
                }
                differX *= 0.9; /*没触发mousemover时点击后松开differ为undefinde，导致后续differ为NaN无法拖动，因此需要给differ一个初始值*/
                differY *= 0.9;
                roX -= differY * 0.3;
                roY += differX * 0.3;
                $main.css({"transform": "translateZ("+tZ+"px) rotateX(" + roX + "deg) rotateY(" + roY + "deg)"});
            },10);
        }).mousewheel(function () {
            clearInterval(timer2);
            var n = arguments[1];  /*封装的滚轮事件第二个参数可知滚动的方向*/
            tZ += n * 100;
            tZ = Math.min(0,tZ);  /*限制Z轴移动的最小值*/
            tZ = Math.max(-6000,tZ);
            $main.css({"transform": "translateZ("+tZ+"px) rotateX(" + roX + "deg) rotateY(" + roY + "deg)"});
            timer2 = setInterval(function () {
                if(Math.abs(n) < 0.01){
                    clearInterval(timer2);
                    return false;
                }
                n *= 0.86;
                tZ += n*100;
                tZ = Math.min(0,tZ);
                tZ = Math.max(-6000,tZ);
                $main.css({"transform": "translateZ("+tZ+"px) rotateX(" + roX + "deg) rotateY(" + roY + "deg)"});
            },10)
        });
        //点击li显示board
        $("#main>li").on("click",function () {
            board.show(1200).css({
                "transform": "rotateY(0deg) scale(1) "
            });
            return false;
        });
        $(document).on("click",function () {
            board.fadeOut(700,function () {
                $(this).css({
                    "transform": "rotateY(0deg) scale(1) "
                });
            }).css({
                "transform": "rotateY(180deg) scale(.1)",
            });
        });
        board.on("click",function () {
            return false;
        });
        //点击board图片显示frame
        $(".d-img").on("click",function () {
            leftAll.animate({
                "marginLeft": "-100%"    /*页面左移*/
            },1000,function () {
                board.css({       //board自动消失
                    'transform' : "rotateY(0deg) scale(1.5)",
                    "display": "none"
                });
            });
            frame.show().animate({ /* frame显示*/
                "left" : 0
            },500);
            return false;
        });
        $("#back").on("click",function () {
            leftAll.animate({
                "marginLeft": 0
            },1000);
            frame.animate({"left": "100%"},1000).find("iframe");
            return false;
        })
    }());
});
