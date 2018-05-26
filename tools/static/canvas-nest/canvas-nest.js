/**
 * 引用为页面添加动态点线背景
 */
!function() {
    //配置信息，可考虑js调用传值
    var config = {
        zIndex: -1,
        opacity: .5,
        color: "0,0,0",
        count: 99
    }
    //定义画布
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    //定义 定时器 默认使用h5提供的requestAnimationFrame
    var timer = window.requestAnimationFrame || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame || 
                window.oRequestAnimationFrame || 
                window.msRequestAnimationFrame || 
                function(n) {
                    //若无法取到定时器，按照每秒60Hz速率刷新
                    window.setTimeout(n, 1e3 / 60)
                }
    var random = Math.random;
    var mouse = {
        x: null,
        y: null,
        max: 2e4
    };
    //定义画布CSS
    canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + config.zIndex + ";opacity:" + config.opacity,
    //添加画布到body
    document.getElementsByTagName("body")[0].appendChild(canvas);
    //定义页面画布大小
    var width;
    var height;
    getSize();
    //浏览器大小改变重新设置页面大小
    window.onresize = getSize;

    for (var arrayInit = [], count = 0; config.count > count; count++) {
        arrayInit.push({
            x: random() * width,//横坐标
            y: random() * height,//纵坐标
            xa: 2 * random() - 1,//横轴偏移
            ya: 2 * random() - 1,//纵轴偏移
            max: 6e3
        });
    }
    var array = arrayInit.concat([mouse]);
    window.setTimeout(function() {
        draw()
    }, 100)

    
    //获取页面大小
    function getSize(){
        width = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        height = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
    //鼠标移动
    window.onmousemove = function(n) {
        n = n || window.event,
        mouse.x = n.clientX,
        mouse.y = n.clientY
    }
    //鼠标移出
    window.onmouseout = function() {
        mouse.x = null,
        mouse.y = null
    }
    //划线
    function draw() {
        ctx.clearRect(0, 0, width, height);
        var other;//其他的点，相对forEach 循环中当前的 i
        var otherIndex;//索引
        var t, o, m, l;
        arrayInit.forEach(function(i, x) {
            //计算点的偏移后位置
            i.x += i.xa;
            i.y += i.ya;
            i.xa *= i.x > width || i.x < 0 ? -1 : 1;
            i.ya *= i.y > height || i.y < 0 ? -1 : 1;
            //画点
            ctx.fillRect(i.x - .5, i.y - .5, 1, 1);
            //当前点与它后面的点进行循环比较，前面的点已经在上一次循环比较过了
            for (otherIndex = x + 1; otherIndex < array.length; otherIndex++){
                other = array[otherIndex];
                if(null !== other.x && null !== other.y){
                    o = i.x - other.x;
                    m = i.y - other.y;
                    l = o * o + m * m;
                    if(l < other.max){
                        if(other === mouse && l >= other.max / 2){
                            i.x -= .03 * o;
                            i.y -= .03 * m;
                        }
                        t = (other.max - l) / other.max;
                        ctx.beginPath();
                        ctx.lineWidth = t / 2;
                        ctx.strokeStyle = "rgba(" + config.color + "," + (t + .2) + ")";
                        ctx.moveTo(i.x, i.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
            }
        });
        timer(draw);
    }
}();
