## 今日总结(jq照片墙)

设置图片的**所有transition为1s**会**影响淡入淡出fadeIn，fadeOut的效果**，因此只设置transform部分1s

```
transition: transform 1s;/* ！！！不能设置全为1s，会影响fadeOut方法无法淡出bug*/
```

动画还能用**时间差**方法，点击时如果在上次动画执行完之前不会执行下次动画，new Date（）获取当前值，减去上次执行保存的时间要大于前一次代码执行结束的时间才可继续

```
var limTime = 0;
if(new Date() - limTime > 2000){  /* 正在进行大小图切换动画时点击无效*/
    limTime = new Date();
    执行下一次动作
 }
```

**overflow：hidden**隐藏窗口拖拽**小数计算获取宽高的误差**

```
overflow:hidden; /*剪切拖拽窗口小数计算误差使wrap溢出的宽高*/
```