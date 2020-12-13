## 今日总结(原生js拖拽照片墙)

还是注意**transform的顺序**，很重要

鼠标拖动时需要先转X轴再转Y轴，先旋转再平移，否则会有异常

判断鼠标移动快慢，通过记录比较当前和上次移动的鼠标位置距离，越远证明速度越快.

```
transform-style: preserve-3d;/*变换风格变3d*/
```

```
perspective: 800px;/*场景深度,实现近大远小，所在的哪个父元素会影响选择的中心*/
```

### 渐变

##### 径向渐变radial-gradient(一般用于圆)

**radial-gradient(开始位置（x y）,结束位置(x y),开始颜色，结束颜色)**

```
background: -webkit-radial-gradient(center center, 600px 600px, rgba(16,255,254,.3), rgba(0,0,0,0));/*分号必须要有*/
```

##### 线性渐变linear-gradient

**linear-gradient(渐变方向，开始颜色 开始位置，结束颜色 结束位置)**

```
-webkit-linear-gradient(top,rgba(0,0,0,0) 40%,rgba(0,0,0,0.5) 100%);
```

由于不够兼容，渐变都要加**兼容前缀**

#### 倒影box-reflect

box-reflect（朝向，偏移量，遮盖颜色(可用渐变)）

```
-webkit-box-reflect:below 5px -webkit-linear-gradient(top,rgba(0,0,0,0) 40%,rgba(0,0,0,0.5) 100%);
```

也要加**兼容前缀**