$(function(){
   var  allLength = 125;
   var  main = $("#main");
   var  time,timer1,timer2;
   var differX = 0,ruX=0;
   var differY = 0,ruY=0;
   var tuZ = -2000;
   var bt = {
       "0": table,
       "1": sphere,
       "2": helix,
       "3": grid
   };
   init();
   time = setTimeout(function () {
       grid();
       $("#btns").css({
           "transform":"scale(1)",
           "opacity": "1"
       });
       clearTimeout(time);
   },500);
    //初始化li
    function init() {
       for(var i=0;i<allLength;i++){
           var rX = (Math.random()-0.5)*5000;
           var rY = (Math.random()-0.5)*5000;
           var rZ = (Math.random()-0.5)*5000;
           var li = $("<li><p class='title'>Js</p><p class='author txt'>QXJ</p><p class='time txt'>2019.08.16</p></li>");
           main.append(li);
           li.css({
               "transform": "translate3d("+rX+"px,"+rY+"px,"+rZ+"px)"
           });
       }
    }
    //网格排序
    function grid() {
        var eX = 500,eY = 500,eZ = 800;
        var fX = -2*eX,fY = -2*eY;
        $("#main>li").each(function (i,ele) {
           var x = fX+((i%25)%5)*eX;
           var y = fY+parseInt(((i%25)/5))*eY;
           var z = (-2+parseInt(i/25))*eZ;
           $(ele).css({
               "transform": "translate3d("+x+"px,"+y+"px,"+z+"px)",
           })
        });
    }
    //表格
    function table(){
        var x1 = 160,y1 = 200;
        var fX = -9*x1,fY = -4*y1;
        var x,y;
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
        $("#main>li").each(function (i,ele) {
            if(i<18){
                x = arr[i].x;
                y = arr[i].y;
            }else{
                x = fX + x1*((i+18)%18);
                y = fY + y1*parseInt((i+18)/18+1);  //！！！由于i从0开始这里必须加1，18个之后要加18否则前面十八个空位会被自动覆盖
            }
            $(ele).css({
                "transform": "translate("+x+"px,"+y+"px)"
            });
        });
    }
    //球体
    function sphere(){
        var arr = [1,4,7,11,13,16,19,16,13,11,9,5,1];
        var frX = 90;
        $("#main>li").each(function (ind,ele) {
           var num,index,sum=0;
           for(var i=0;i<arr.length;i++){
            //    直到当前行排列完成的目标数量
               sum+=arr[i];
            //    当前行还没排列完
               if(sum>ind+1){
                // 当前第几行
                   index=i;
                //    此行第几个
                   num=arr[i]-(sum-ind);
                   break; //!!!!必须加不然会undefind
               }
           }
           var eY = 360/arr[index];
           var eX = 180/arr.length;
           var rX = index%2===0?frX+eX*index:frX-eX*index;
           var rY = num*eY;
           var rZ = 0;//防止文字倒过来
            if(rX>90&&rX<270){
                rZ = 180;
            }
            $(ele).css({
                "transform": "rotateY("+rY+"deg) rotateX("+rX+"deg) rotateZ("+rZ+"deg) translateZ(800px)" //先绕Y轴旋转，再X轴再Z轴最好看，最后再平移Z轴否则没效果
            });
        });
    }
    //螺旋
    function helix(){//螺旋三要素，绕Y轴旋转(圆)，Y方向平移(上下)，Z方向固定平移(螺旋直径)
        var ftY = -650;
        var eY = parseInt(1300/allLength);
        $("#main>li").each(function (index,ele) {
           var  tY = ftY+(eY*index);
           var  rY = eY*index;
           $(ele).css({
               "transform": "rotateY("+rY+"deg) translateY("+tY+"px) translateZ(800px)"
           });
        });
    }
    //拖拽事件
    $(document).on("mousedown",function (e) {
        var cX = e.clientX,nX;
        var cY = e.clientY,nY;
        $(this).on("mousemove",function (e) {
           nX = e.clientX;
           nY = e.clientY;
           differX = nX - cX;
           differY = nY - cY;
           cX = nX;
           cY = nY;
           ruX -= differY*0.2;
           ruY += differX*0.2;
           main.css({
               "transform": "translateZ("+tuZ+"px) rotateX("+ruX+"deg) rotateY("+ruY+"deg) "
           });
        });
    }).mousewheel(function () {
        clearInterval(timer2);  //！！！！！因为滑轮事件每次不定次数触发，前一个没结束后一个又会开启定时器，导致不能清完定时器，否则只会滑动第一次
        var d = arguments[1];
        tuZ += d*100;
        main.css({
            "transform": "translateZ("+tuZ+"px) rotateX("+ruX+"deg) rotateY("+ruY+"deg) "
        });
        timer2 = setInterval(function () {
            if(Math.abs(d)<0.01){
                clearInterval(timer2);
                return false;
            }
            d *= 0.8;
            tuZ += d*100;
            main.css({
                "transform": "translateZ("+tuZ+"px) rotateX("+ruX+"deg) rotateY("+ruY+"deg) "
            });
        },10)
    }).on("mouseup",function () {
       $(this).off("mousemove");
       timer1 = setInterval(function () {
           if(differX<0.4&&differY<0.4){
               clearInterval(timer1);
               return false;
           }
           differX *= 0.9;
           differY *= 0.9;
           ruX -= differY*0.2;
           ruY += differX*0.2;
           main.css({
               "transform": "translateZ("+tuZ+"px) rotateX("+ruX+"deg) rotateY("+ruY+"deg) "
           });
       },10);
    });
    //按钮选择排序方式
    $("#btns>li").on("click",function () {
        var index = $(this).index();
        bt[index]();
    });
});