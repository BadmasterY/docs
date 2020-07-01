## Relearn Canvas 
> 本章会穿插少量的 `WebGL` 知识, 但不会做过多解释, 感兴趣的可以等待后续 `WebGL`相关的章节。  
> `BTW`: 在学习之前, 您需要具备一些基本的 `HTML` 与 `JavaScript` 知识。  

> 这里使用 `Canvas` 或者 `canvas` 来表示整体概念, 而带有尖角括号的 `<canvas>` 特指 `HTML` 元素。  

### 前言
> 前言内容全部来自 [w3school](https://www.w3school.com.cn/html5/tag_canvas.asp), 我只是个搬运工, 不添加任何内容👏。

#### 1. 历史
这个 `HTML` 元素是为了客户端矢量图形而设计的。它自己没有行为，但却把一个绘图 `API` 展现给客户端 `JavaScript` 以使脚本能够把想绘制的东西都绘制到一块画布上。

`<canvas>` 标记由 `Apple` 在 `Safari 1.3 Web` 浏览器中引入。对 `HTML` 的这一根本扩展的原因在于, `HTML` 在 `Safari` 中的绘图能力也为 `Mac OS X` 桌面的 `Dashboard` 组件所使用, 并且 `Apple` 希望有一种方式在 `Dashboard` 中支持脚本化的图形。

`Firefox 1.5` 和 `Opera 9` 都跟随了 `Safari` 的引领。这两个浏览器都支持 `<canvas>` 标记。

我们甚至可以在 `IE` 中使用 `<canvas>` 标记, 并在 `IE` 的 `VML` 支持的基础上用开源的 `JavaScript` 代码(由 `Google` 发起)来构建兼容性的画布。[详情](http://excanvas.sourceforge.net/)。

`<canvas>` 的标准化的努力由一个 `Web` 浏览器厂商的非正式协会在推进, 目前 `<canvas>` 已经成为 `HTML 5` 草案中一个正式的标签。[详情](http://www.whatwg.org/specs/web-apps/current-work/)。

#### 2. 与 SVG 以及 VML 之间的差异
`<canvas>` 标记和 `SVG` 以及 `VML` 之间的一个重要的不同是, `<canvas>` 有一个基于 `JavaScript` 的绘图 `API`, 而 `SVG` 和 `VML` 使用一个 `XML` 文档来描述绘图。

这两种方式在功能上是等同的, 任何一种都可以用另一种来模拟。从表面上看, 它们很不相同, 可是, 每一种都有强项和弱点。例如, `SVG` 绘图很容易编辑, 只要从其描述中移除元素就行。

要从同一图形的一个 `<canvas>` 标记中移除元素, 往往需要擦掉绘图重新绘制它。

### 一、初识 Canvas
> 为什么不使用 `画布` 这一称呼? 个人喜好🤣

#### 1. 概念
> 接下来是一段枯燥且乏味的基础知识环节~

`<canvas>` 是一个 `HTML` 元素, 它本身**只是**图形容器, 必须使用脚本(通常来说是 `JavaScript`)来绘制图形。拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法, 可以创建丰富的图形引用。例如, 它可以用于绘制图表、制作图片构图或者制作简单的(以及不那么简单的)动画。

`<canvas>` 是一个矩形区域, 可以控制其每一像素。其默认大小为 `300 × 150` 像素(`宽 × 高`, 像素的单位是 `px`)。可以使用 `HTML` 的高度(`height`)和宽度(`width`)属性来自定义 `Canvas` 的尺寸。

#### 2. <canvas> 元素
```html
<canvas class="canvas" id="canvas" width="300" height="150"></canvas>
```

`<canvas>` 标签只有两个特有属性: `width` 和 `height`。而类似于 `class` 与 `id` 标签是每一个 `HTML` 元素都默认具有的属性。

`<canvas>` 标签也可以通过 `css` 来修改样式。**但是**, 这些样式不会影响在 `<canvas>` 中的实际图像。当没有为 `<canvas>` 定制样式时, 它是完全透明。

#### 3. 回退机制
`<canvas>` 本身支持回退机制。当在某些较老的浏览器(尤其是 `IE9` 之前的 `IE` 浏览器)或者[纯文本浏览器](https://baike.baidu.com/item/%E7%BA%AF%E6%96%87%E6%9C%AC%E6%B5%8F%E8%A7%88%E5%99%A8/8789704?fr=aladdin)中使用 `<canvas>` 时, 在这些浏览器上能展示替代内容。

使用起来很容易, 只是在 `<canvas>` 标签中提供了替换内容。而这个原理也非常简单: 当支持 `<canvas>` 的浏览器渲染时, 会自动忽略标签内内容, 只是正常渲染 `<canvas>`; 而不支持的浏览器自然会忽略无法识别的 `<canvas>` 标签渲染其中的内容。

通常使用 `<canvas>` 时都会在其中填写一段类似的话, 例如:
```html
<canvas class="canvas" id="canvas" width="300" height="150">
    Your browser does not support canvas, please use modern browser!
</canvas>
```

如果可以确定 `<canvas>` 只会运行在现代浏览器中或者不考虑回退机制, 也可以不书写回退内容: `<canvas class="no-bug" id="no-bug"></canvas>`。

**⚠️注意**: `</canvas>` 不能省略! 这是由回退机制决定的。如果被省略, 现代浏览器不会渲染 `<canvas>` 之后的所有内容。

### 二、基础用法
#### 1. 渲染上下文
`<canvas>` 元素创造了一个固定大小的区域, 它公开了**一个或多个渲染上下文**, 其可以用来绘制和处理要展示的内容。`canvas` 起初是空白的。为了展示, 首先需要找到渲染上下文, 然后在它的上面绘制。

通过 `getContext()` 获取上下文, 这里主要研究 `2d` 范畴, 所以使用 `canvas.getContext('2d')`, 获取 `CanvasRenderingContext2D` 接口, 该接口为 `Canvas API` 的一部分。

##### 例子:
```js
const canvas = document.getElementById('canvas');
const ctx = cnavas.getContext('2d');
```

#### 2. 支持检测与回退
替换内容是用于在不支持 `<canvas>` 标签的浏览器中展示的。通过简单的测试 `getContext()` 方法的存在, 可以检查 `JavaScript` 编程支持性同时定制一些回退方案(如果不满足于展示一条不支持信息的话)。如:
```js
const canvas = document.getElementById('canvas');
if(canvas.getContext) {
    const ctx = cnavas.getContext('2d');
}else {
    // fallback codes
}
```

#### 3. 简单的完整示例 —— 画个小房子
`HTML`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas Demo</title>
</head>
<body>
    <canvas id="my-canvas" width="300" height="300">
        Your browser does not support canvas, please use modern browser!
    </canvas>
    <script src="./canvas.js"></script>
</body>
</html>
```

`canvas.js`:
```js
window.onload = function () {
    const canvas = document.getElementById('my-canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        // Set line width
        ctx.lineWidth = 10;

        // Wall
        ctx.strokeRect(75, 140, 150, 110);

        // Door
        ctx.fillRect(130, 190, 40, 60);

        // Roof
        ctx.beginPath();
        ctx.moveTo(50, 140);
        ctx.lineTo(150, 60);
        ctx.lineTo(250, 140);
        ctx.closePath();
        ctx.stroke();
    } else {
        // fallback codes
    }
}
```
##### 效果图:  
<img src="../images/canvas/demo_house.jpg" width="200" alt="小房子" />

看完这个小的 `demo` 是不是很激动? 让我们继续学习吧!
> 潜台词: 不激动? 看看这是啥🔪  
> 源码传送门: [js codes](../test/canvas.js)

### 三、绘制形状
#### 1. 坐标系
![坐标系](../images/canvas/coordinates.gif)

`x` 和 `y` 轴正方向与浏览器窗口一致(了解: `WebGL` 中 `y` 轴方向相反), 坐标系原点为 `<canvas>` 左上角。

#### 2. 绘制矩形
`<canvas>` 支持两种形式的图形绘制: **矩形**和**路径**(由一系列点连成的线段)。所有其他类型的图形都是通过一条或者多条**路径**组合而成的。众多**路径**生成的方法让复杂图形的绘制成为了可能。

Ok! 言归正传, `canvas` 提供了三种绘制矩形的方式(三种形式都属于 `Canvas 2D API`):
- `fillRect(x, y, width, height)`: 绘制一个填充的矩形。
- `strokeRect(x, y, width, height)`: 绘制一个矩形边框。
- `clearRect(x, y, width, height)`: 清除指定矩形区域, 让清除部分完全透明。

上面提供的方法之中每一个都包含了相同的参数。`x` 与 `y` 指定了在 `canvas` 上所绘制的矩形的左上角(相对于原坐标系原点)的坐标。 `width` 和 `height` 设置矩形的尺寸。

##### `JavaScript` 代码:
```js
window.addEventListener('load', () => {
    const canvas = document.getElementById('my-canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        // clear
        // 从原点开始清空 canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw rect
        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(55, 55, 40, 40);
    } else {
        // fallback codes
    }
}, false);
```

> 源码传送门: [drawRect.js](../test/drawRect.js)

##### 绘制顺序:
> 我是个**视觉学习者**, 这个绘制顺序方便学习, 实际上只能看到最后的结果。

![Rect绘制顺序](../images/canvas/rect.gif)

#### 3. 绘制路径(Path)
所有图形的基本元素是路径。路径是通过不同**颜色**和**宽度**的线段或曲线相连形成的不同形状的**点的集合**。一个路径, 甚至一个子路径, 都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 创建路径起点
2. 使用相关函数进行绘制
3. 封闭路径
4. 通过描边或填充路径区域来渲染图形

> 接下来是一大段的基础知识, 快记笔记~

##### 路径相关函数:
- **`beginPath()`**: 清空子路径列表开始一个新的路径。当创建一个新的路径时, 调用此方法。
- **`closePath()`**: 使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
- **`moveTo(x, y)`**: 将一个新的子路径的起始点移动到 `(x, y)` 坐标。
- **`lineTo(x, y)`**: 使用直线连接子路径的最后的点到 `(x, y)` 坐标。
- **`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`**: 添加一个三次贝赛尔曲线路径。该方法需要三个点。 第一、第二个点是控制点(`cp1`, `cp2`), 第三个点是结束点(`x`, `y`)。起始点是当前路径的最后一个点(最新绘制的点), 绘制贝赛尔曲线前, 可以通过调用 `moveTo(x, y)` 修改起始点。
- **`quadraticCurveTo(cpx, cpy, x, y)`**: 添加一个二次贝赛尔曲线路径。它需要2个点。 第一个点是控制点(`cp`), 第二个点是终点(`x`, `y`)。起始点是当前路径最后一个点(最新绘制的点), 当创建二次贝赛尔曲线之前, 可以使用 `moveTo(x, y)` 方法进行改变。
- **`arc(x, y, radius, startAngle, endAngle, anticlockwise)`**: 绘制圆弧路径的方法。圆弧路径的圆心在 `(x, y)` 位置, 半径为 `radius`, 根据 `anticlockwise`(这是一个 `Boolean` 值, 默认为 `false`, 顺时针)指定的方向从 `startAngle` 开始绘制, 到 `endAngle` 结束。
- **`arcTo(x1, y1, x2, y2, radius)`**: 根据控制点和半径绘制圆弧路径。根据当前描点(当前路径最后一个点)与给定的**控制点1**连接的直线, 和**控制点1**与**控制点2**连接的直线, 作为使用指定半径的圆的**切线**, 画出两条切线之间的弧线路径。
- **`ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)`**: 添加椭圆路径的方法。椭圆的圆心在 `(x,y)` 位置, 半径分别是 `radiusX` 和 `radiusY`, 按照`anticlockwise`(这是一个 `Boolean` 值, 默认为 `false`, 顺时针)指定的方向, 从 `startAngle` 开始绘制, 到 `endAngle` 结束。
- **`rect(x, y, width, height)`**: 创建矩形路径的方法, 矩形的起点位置是 `(x, y)`, 尺寸为 `width` 和 `height`。矩形的4个点通过直线连接, 子路径闭合, 所以可以填充或者描边矩形。

##### 绘制路径相关函数:
- **`fill([fillRule])/fill(path [, fillRule])`**: 通过填充路径的内容区域生成实心的图形。`path` 为需要填充的 `path2D` 路径, `fillRule` 为一种算法, 决定点是在路径内还是在路径外, 可选值为: `nonzero` 和 `evenodd`。默认: `nonzero`。一般来说, 只会直接调用, 即 `fill()`。
- **`stroke([path])`**: 使用当前的样式描边子路径。使用非零环绕规则(`nonzero`), 根据当前的画线样式, 绘制当前或已经存在的路径的方法。`path` 为需要描边的 `path2D` 路径。一般来说, 只会直接调用, 即 `stroke()`。
- **`drawFocusIfNeeded(element)/drawFocusIfNeeded(path, element)`**: 如果给定的元素获取了焦点, 那么此方法会在当前的路径绘制一个焦点。 `element` 是用于检查是否聚焦的元素, `path` 为使用的 `path2D` 路径。
- **`scrollPathIntoView([path])`**: 将当前或给定的路径滚动到窗口。
- **`clip([fillRule])/clip(path [, fillRule])`**: 从当前路径创建一个剪切路径。在 `clip()` 调用之后, 绘制的所有信息只会出现在剪切路径内部。
- **`isPointInPath(x, y [, fillRule])/isPointInPath(path, x, y [, fillRule])`**: 判断当前路径是否包含检测点。监测点坐标 `x` 和 `y`, `fillRule` 检测算法, `path` 为 `Path2D` 路径。
- **`isPointInStroke(x, y)/isPointInStroke(path, x, y)`**: 判断检测点是否在路径的描边线上。除了无法指定检测算法 `fillRule`, 其余参数与 `isPointInPath` 一致。

> 补充:  
> [非零规则(`nonzero`)](https://en.wikipedia.org/wiki/Nonzero-rule)  
> [奇偶规则(`evenodd`)](https://en.wikipedia.org/wiki/Even%E2%80%93odd_rulee)

##### 例子 —— 绘制三角形
```js
const canvas = document.getElementById('my-canvas');
if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. create path
    ctx.beginPath();
    // 2. move to start point
    ctx.moveTo(75, 50);
    // 3. create lines
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    // 4. close path
    ctx.closePath();
    // 5. fill or stroke
    ctx.fill();
    // ctx.stroke();
} else {
    // fallback codes
}
```

> 源码传送门: [drawTriangle.js](../test/drawTriangle.js)

其中第四步 `closePath()` 不是必须的, 使用 `fill()` 时会自动闭合所有路径, 但是 `stroke()` 并不会。

##### 绘制顺序:
> 实际上, `moveTo()`、`closePath()` 与 `lineTo()` 函数不会绘制任何东西, 这里只是方便理解!  
> 不相信? 注释掉 `ctx.fill()` 试试。

![Triangle绘制顺序](../images/canvas/triangle.gif)

##### 移动画笔🖌️
> 或许这就是为什么以 `canvas` 命名的原因?  
> 画笔只是虚指, 实际上并没有任何`笔`。

使用路径绘图时, 有一个非常重要的函数: `moveTo(x, y)`, 但这个函数不会绘制任何内容。

或许可以想像一下自己在考试时无从下笔的亚子(什么也写不出来, 但是在卷子上动来动去)?😊

![无从下笔的亚子](../images/canvas/moveTo.gif)

当 `canvas` 初始化或者 `beginPath()` 调用后, 通常会使用 `moveTo()` 函数设置起点。同时也能够使用 `moveTo()` 绘制一些不连续的路径。

##### 例子 —— 笑脸
```js
const canvas = document.getElementById('my-canvas');
if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. start path
    ctx.beginPath();
    // ctx.moveTo(75, 75);
    // 2. face
    ctx.arc(75, 75, 50, 0, Math.PI * 2);
    // ctx.arc(75, 75, 50, Math.PI / 6, Math.PI * 2);
    // 3. move
    ctx.moveTo(110, 75);
    // 4. mouse
    ctx.arc(75, 75, 35, 0, Math.PI);
    // 5. move
    ctx.moveTo(65, 65);
    // 6. left eye
    ctx.arc(60, 65, 5, 0, Math.PI * 2);
    ctx.moveTo(95, 65);
    // 7. right eye
    ctx.arc(90, 65, 5, 0, Math.PI * 2);
    // 8. close path
    ctx.closePath();
    // 9. stroke
    ctx.stroke();

} else {
    // fallback codes
}
```

> 源码传送门: [drawSmilingFace.js](../test/drawSmilingFace.js)

为什么第一次不需要 `moveTo()`? 因为会根据 `arc(75, 75, 50, 0, Math.PI * 2)` 这段函数自动调整至 `(125, 75)` 位置, 也就是 `(75 + 50, 75)` 位置。  
就这? 当然不是, 还需要根据初始角度进行计算, 重新推导为 `(75 + cos(0) * 50, 75 + sin(0) * 50)`。  
这样依旧是不够的, 还要根据顺时针还是逆时针进行计算。

不信? 打开注释掉的 `ctx.moveTo(75, 75)` 或者替换为 `ctx.arc(75, 75, 50, Math.PI / 6, Math.PI * 2);` 看看。

##### 绘制顺序:
![smilingFace绘制顺序](../images/canvas/smilingFace.gif)

> 论**数学**的重要性:  
> 三角函数忘干净了怎么办, 快去找[度娘]((https://baike.baidu.com/item/%E4%B8%89%E8%A7%92%E5%87%BD%E6%95%B0/1652457?fr=aladdin))或者 [wiki](https://en.wikipedia.org/wiki/Trigonometric_functions)。

> 题外话: 如果想要学好 `WebGL` 玩转着色器语言(`GLSL`) 的话, 还是赶紧想想高数概率论啥的忘干净没。

##### 线🧵
> 创建的都是直线, 曲线请使用圆弧。

绘制直线, 需要用到的方法 `lineTo()`。

该方法有两个参数: `x` 和 `y`, 代表坐标系中直线结束的点。开始点和之前的绘制路径有关, 之前路径的结束点就是接下来的开始点, 开始点也可以通过 `moveTo()` 函数改变。

##### 例子 —— 两个三角形
```js
const canvas = document.getElementById('my-canvas');
if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;

    // fill triangle
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.closePath();
    ctx.fill();

    // stroke triangle
    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath(); // It cannot be omitted
    ctx.stroke();
} else {
    // fallback codes
}
```

> 源码传送门: [drawTriangle_2.js](../test/drawTriangle_2.js)

##### 绘制顺序:
![two triangles绘制顺序](../images/canvas/triangle_2.gif)

##### 圆弧
绘制圆弧或者圆, 使用 `arc()` 方法。当然也可以使用 `arcTo()`, 不过这个方法的实现并不是那么的可靠, 不做赘述, 感兴趣的可以自己玩一玩。

这里详细介绍一下 `arc()` 方法, 该方法有六个参数: `x`, `y` 为绘制圆弧所在圆上的圆心坐标。`radius` 为半径。`startAngle` 以及 `endAngle` 参数用弧度定义了开始以及结束的弧度。这些都是以 `x` 轴为基准。参数 `anticlockwise` 为一个布尔值。默认为 `false`, 顺时针方向。当为 `true` 时，是逆时针方向。

> `startAngle` 与 `endAngle` 都是弧度, 而非角度。弧度 = (Math.PI / 180) * 角度。  
> 也可以理解为 `Math.PI` 是 `180°`。

###### 例子 —— 一组圆弧
```js
const canvas = document.getElementById('my-canvas');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');

  ctx.lineWidth = 1;

  // clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // create 4 x 3 arc
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();
      // center point position
      const x = 25 + j * 50;
      const y = 25 + i * 50;
      // radius
      const radius = 20;
      const startAngle = 0;
      const endAngle = Math.PI + (Math.PI * j) / 2;
      // event or odd
      const anticlockwise = i % 2 == 0 ? false : true;

      // create arc
      ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

      if (i > 1) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
} else {
  // fallback codes
}
```
