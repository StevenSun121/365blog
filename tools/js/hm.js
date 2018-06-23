var linkData = [
                {
                    name: "前端工具",
                    include: [
                        {name: "json美化",link: "/tools/webhelper/jsonFormat.html"},
						{name: "XML格式化",link: "/tools/webhelper/xmlFormat.html"},
                        {name: "压缩文本",link: "/tools/webhelper/compressText.html"},
                        {name: "二维码",link: "/tools/webhelper/qrCode.html"},
						{name: "程序员黄历",link: "/tools/webhelper/coderCalender.html"},
						{name: "程序员求签",link: "/tools/webhelper/coderLottery.html"},
						{name: "人民币大写",link: "/tools/webhelper/upperRMB.html"},
						{name: "进制转换",link: "/tools/webhelper/hexConvert.html"}
                    ]
                },
				{
                    name: "休闲游戏",
                    include: [
                        {name: "贪吃蛇",link: "/tools/games/snake.html"},
						{name: "迷宫",link: "/tools/games/maze.html"},
						{name: "拼图",link: "/tools/games/puzzle.html"},
						{name: "俄罗斯方块",link: "/tools/games/tetris.html"}
                    ]
                },
                {
                    name: "工具链接",
                    include: [
                        {name: "双拼练习",link: "https://api.ihint.me/shuang/"},
                        {name: "水水的证件",link: "http://www.simpletool.cn/"},
                        {name: "hackChat",link: "https://hack.chat/?doubi365"}
                    ]
                }
            ];
$(document).ready(function(){
    //自定义改动，避免出现先加载原始站点，然后又更新部分站点信息的情况；设置整体div.blocks为透明，不影响resize，并且可以做到在获取storage数据后再取消透明
    $("div.blocks").css('opacity','0');
    
    var link = "";
    for(i=0;i<linkData.length;i++){
	    link += "<div class=\"col-sm-4 col-lg-4 block\">";
	    link += "<div class=\"col-sm-12 col-lg-12 building\">";
	    link += "	<div class=\"row block-header\">";
	    link += "		<div class=\"col-sm-12 col-lg-12 block-desc\">";
	    link += "  			<div class=\"col-sm-4 col-lg-4 block-name\">";
	    link += "    			<label class=\"block-name\">";
	    link += linkData[i].name;
		link += "    			</label>";
		link += "      			</div>";
		link += "  			<div class=\"col-sm-4 col-lg-4 placeholder\"></div>";
		link += "  			<div class=\"col-sm-4 col-lg-4 placeholder\"></div>";
		link += "		</div>";
		link += "	</div>";
		for(j=0;j<linkData[i].include.length;j++){
			link += "	<div class=\"col-sm-4 col-lg-4 website\">";
			link += "		<a href=\""+linkData[i].include[j].link+"\" class=\"website\" target=\"_blank\">";
			link += "			<span>"+linkData[i].include[j].name+"</span>";
			link += "		</a>";
			link += "	</div>";
		}
		link += "	</div>";
		link += "</div>";
    }	
    	
    $("div.blocks").html(link);
    $(window).resize(function(){
    	var top_in_digits = ($(window).height() - $("div.content").outerHeight())/4;
    	top_in_digits = (top_in_digits > 0)?top_in_digits:0;
    	$("div.content").css({
	        position:"relative",
	        top:top_in_digits,
	        margin:"0 auto",
	        float:"none",
	        display:"inherit"
        });
    });
    $(window).resize();
    $("a.website").attr("target","_blank");
    $("a.website").hover(
		function(){
			$(this).addClass("hover");
		}, function(){
        $(this).removeClass("hover");
	});
    $("a.website").click(function(){
    	$(this).removeClass("hover");
    });
    $("#browserIndex").click(function(){
    	$("body").addClass("modal-open");
    	$("#backdrop").show();
    	$("#browserIndexModal").addClass("in");
    	$("#browserIndexModal").slideToggle(950);
	});
    $("#browserIndexModal button").click(function(){
    	$("body").removeClass("modal-open");
    	$("#backdrop").hide();
    	$("#browserIndexModal").removeClass("in");
    	$("#browserIndexModal").slideToggle(950);
    });
    $("#about").click(function(){
    	$("body").addClass("modal-open");
    	$("#backdrop").show();
    	$("#aboutModal").addClass("in");
    	$("#aboutModal").slideToggle(950);
    });
    $("#aboutModal button").click(function(){
    	$("body").removeClass("modal-open");
    	$("#backdrop").hide();
    	$("#aboutModal").removeClass("in");
    	$("#aboutModal").slideToggle(950);
    });
    function checkUserAgent(){
    	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        if (userAgent.indexOf("Firefox") > -1) {
        	$("#firefox_extension_tips").show();
        }else if (userAgent.indexOf("Chrome") > -1){
        	$("#chrome_extension_tips").show();
        }else if (userAgent.indexOf("Safari") > -1) {
        	$("#safari_extension_tips").show();
        }else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        	$("#ie_extension_tips").show();
        }else if (userAgent.indexOf("metasr") > -1) {
        	$("#sougou_extension_tips").show();
        }else if (userAgent.indexOf("lbbrowser") > -1) {
        	$("#liebao_extension_tips").show();
        }else if (userAgent.indexOf("360ee") > -1) {
        	$("#360ee_extension_tips").show();
        }else{
        	$("#chrome_extension_tips").show();
        }
    }
    checkUserAgent();
    $("div.blocks").css('opacity','1');
});
$(function () {
	var W = $(window).width(),
		H = $(window).height(),
		x2 = -15, len = 30, count = 100;
	var canvas = document.getElementById("snow");
	canvas.width = W;
	canvas.height = H;
	var ctx = canvas.getContext('2d');
	var screenX = 0;
	setInterval(clearCanvas,50);
	function clearCanvas() {
		ctx.clearRect(0, 0, W, H);
		draws();
	}

	function draw(x, y, offset) {
		//canvas写渐变：createLinearGradient（startX,startY,endX,endY）
		var grd = ctx.createLinearGradient(x, y, x + x2, y + len);
		grd.addColorStop(0, "rgba(0,0,0,0)");
		grd.addColorStop(0.5, "rgba(105,105,105,1)");
		grd.addColorStop(1, "rgba(255,255,255,1)");
		ctx.strokeStyle = grd;

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + x2 + ((W-offset)/W)*Math.abs(x2)*2, y + len);
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.closePath();
	}
	function draws() {
		var offset = screenX;
		for (var i = 1; i <= count; i++) {
			draw(Math.random() * W, Math.random() * H, offset);
		}
	}
	document.onmousemove=function(e){
		e=e?e:window.event;
		screenX = e.screenX;
	}
});