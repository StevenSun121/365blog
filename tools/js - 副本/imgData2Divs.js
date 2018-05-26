/*!
 * create divs from 8bit image data
 * @author chenjunkai<i@cjkis.me>
 */

var winH=document.documentElement.clientHeight||document.body.clientHeight,
    winW=document.documentElement.clientWidth||document.body.clientWidth,
    isSupportDataset=document.documentElement.dataset==undefined?false:true;


/**
 *创建一个大的div，里面放着组成图片的多个小div
 *@param id
 *@param childSize 小方块的长度
 *@param lengthX 横向小方块数量
 *@param lengthY 竖向...
 *@param posX 本div的left
 *@param posY .......top
 *@param dataArr 8bit图片的数据数组
 *@param color 颜色
 *@param logoImgSrc logo图片路径
 *@param logoLength logo边长要由几个div组成
 *@param cd 掉落方块恢复时间
 *@param hideBegining 开始是否隐藏
 */
function DivsImg(){
	var attr={
		id:arguments[0].id,
		childSize:arguments[0].childSize||5,
		lengthX:arguments[0].lengthX,
		lengthY:arguments[0].lengthY,
		posX:arguments[0].posX,
		posY:arguments[0].posY,
		dataArr:arguments[0].dataArr,
		color:arguments[0].color||'#123',
		logoImgSrc:arguments[0].logoImgSrc||'',
		logoLength:arguments[0].logoLength||5,
		cd:arguments[0].cd||0,
		hideBegining:arguments[0].hideBegining||0
	},
		q=document.createElement('div');

	if(attr.logoImgStc!=''){
		for(var i=0,pos=parseInt((attr.dataArr.length-attr.logoLength)/2);i<attr.logoLength;i++){
			for(var j=0;j<attr.logoLength;j++){
				attr.dataArr[pos+i][pos+j]-=256;
			}
		}
	}

	q.id=attr.id;
	q.className='divsImg';
	var qs=q.style;
	qs.width=attr.childSize*attr.lengthX+'px';
	qs.height=attr.childSize*attr.lengthY+'px';
	qs.position='fixed';
	qs.left=attr.posX+'px';
	qs.top=attr.posY+'px';

	this.divsImg=q;
	this.imgDivSize=attr.childSize;
	this.lengthX=attr.lengthX;
	this.lengthY=attr.lengthY;
	var imgDivArray=new Array(attr.lengthY),
		ySquareDropCount=new Array(attr.lengthX);
	for(var i=0;i<attr.lengthY;i++){
		imgDivArray[i]=new Array(attr.lengthX);
		ySquareDropCount[i]=0;
	}
	this.ySquareDropCount=ySquareDropCount;
	this.cd=attr.cd;
	this.cdInit=attr.cd;
	this.dropOrder=new Array();
	this.logoImgSrc=attr.logoImgSrc;
	this.logoImgSize=attr.logoImgSize;
	// console.log(divsImgDataArr);

	this.imgDivArray=imgDivArray;

	this.imgDivOnMouseOver=(function(thisDivsImg){
		return function(){
			this.onmouseover=null;
			var thisIndexX=isSupportDataset?this.dataset.indexX:this.getAttribute('data-index-x');
			var topWillSet=winH-(++thisDivsImg.ySquareDropCount[thisIndexX])*thisDivsImg.imgDivSize,
				topNow=this.style.top.replace('px','');
			var dropTime=Math.sqrt((topWillSet-topNow)*0.0005);
			// console.log(dropTime,topWillSet,topNow);
			this.style.transition='top '+dropTime+'s ease-in';
			if(topNow<topWillSet)
				this.style.top=topWillSet+'px';
			var dOrd=thisDivsImg.dropOrder;
			dOrd[dOrd.length]=this;
			thisDivsImg.cd=thisDivsImg.cdInit;
		}
	})(this);

	this.imgDivAllBack=(function(thisDivsImg){
		return function(){
			var d=thisDivsImg.dropOrder;
			var interId=setInterval(function(){
				if(d.length<=0){
					clearInterval(interId);
					return
				}
				var di=d[d.length-1];
				if(isSupportDataset){
					var diTop=di.dataset.top,
						diIndexX=di.dataset.indexX;
				}else{
					var diTop=di.getAttribute('data-top'),
						diIndexX=di.getAttribute('data-index-x');
				}
				di.style.top=diTop+'px';
				thisDivsImg.ySquareDropCount[diIndexX]--;
				di.onmouseover=thisDivsImg.imgDivOnMouseOver;
				d.length--;
			},5);		
		}
	})(this);

	//当选择开始隐藏，然后从上面掉下的函数
	//将已经移到视窗上面的每个子div的top改回正常数据
	//未完成
	this.imgDivShowBegining=(function(thisDivsImg){
		return function(){
			// var divs=document.getElementsByClassName(thisDivsImg.divsImg.id);
			// var ida=thisDivsImg.imgDivArray,
			// 	yLen=ida.length,
			// 	xLen=ida[0].length,
			// 	y=yLen-1;

			// var interId=setInterval(function(){
			// 	if(y<0){
			// 		clearInterval(interId);
			// 		return
			// 	}
			// 	if(x<0||x>=xLen)
			// },5);
			for(var yLen=ida.length,xLen=ida[0].length,y=yLen-1;y>=0;y--){
				for(var even=y%2,x=even?xLen-1:0;!(x<0||x>=xLen);){
					console.log(y,x)
					if(even)
						x--;
					else
						x++;
				}
			}
		}
	})(this);

	this.autoBackTurnOn=(function(thisDivsImg){
		return function(){
			var interId=setInterval(function(){
				if(thisDivsImg.cd<0){
					clearInterval(interId);
					thisDivsImg.imgDivAllBack();
					thisDivsImg.cd=thisDivsImg.cdInit;
					thisDivsImg.autoBackTurnOn();
				}
				thisDivsImg.cd--;
			},1000);
		}
	})(this);


	for(var y=0,logoIndex=0;y<attr.lengthY;y++){
		for(var x=0;x<attr.lengthX;x++){
			if(attr.dataArr[y][x]>=255){
			  continue;
			}
			var sX=attr.posX+attr.childSize*x,
				sY=attr.posY+attr.childSize*y;
			if(attr.dataArr[y][x]<0){
				imgDivArray[y][x]=new DivsImgSquare({
					divsImg:this,
					indexX:x,
					indexY:y,
					positionX:sX,
					positionY:sY,
					size:attr.childSize,
					color:attr.color,
					isLogo:true,
					logoSquareCount:attr.logoLength,
					logoIndex:logoIndex
				});
				logoIndex++;
			}else{
		  		imgDivArray[y][x]=new DivsImgSquare({
					divsImg:this,
					indexX:x,
					indexY:y,
					positionX:sX,
					positionY:sY,
					size:attr.childSize,
					color:attr.color
				});
			}
			q.appendChild(imgDivArray[y][x].imgDiv);
		}
	}

	
}

/*
 *  **二维码子方块
 *	DivsImgDiv:DivsImgSquar所属的div
 *	indexX:imgDiv位于DivsImgDiv的第几行
 *	indexY:imgDiv位于DivsImgDiv的第几列
 *	positionX:imgDiv的x轴位置，也就是left值
 *	positoinY:imgDiv的y轴位置，也就是top值
 *	size:大小
 *	dropTime:掉落的时间
 *	[color='#123']:颜色
 *	isLogo:是否Logo div
 *	logoSquareCount:logo方块占多少行(列)
 *	logoIndex:第几个logo方块
 */
function DivsImgSquare(){
	var divsImg=arguments[0].divsImg,
		indexX=arguments[0].indexX,
		indexY=arguments[0].indexY,
		positionX=arguments[0].positionX,
		positionY=arguments[0].positionY,
		size=arguments[0].size,
		color=arguments[0].color||'#123',
		isLogo=arguments[0].isLogo||false,
		logoSquareCount=arguments[0].logoSquareCount||0,
		logoIndex=arguments[0].logoIndex||'';

    var imgDiv=document.createElement('div');
    imgDiv.className=divsImg.divsImg.id+' x'+indexX+' y'+indexY;
    if(isSupportDataset){
    	imgDiv.dataset.top=positionY;
	    imgDiv.dataset.left=positionX;
	    imgDiv.dataset.indexX=indexX;
	    imgDiv.dataset.indexY=indexY;
    }else{
    	imgDiv.setAttribute('data-top',positionY);
    	imgDiv.setAttribute('data-left',positionX);
    	imgDiv.setAttribute('data-index-x',indexX);
    	imgDiv.setAttribute('data-index',indexY);
    }
    // console.log(imgDiv.getAttribute('data-index-x'));
    var s=imgDiv.style;
    if(isLogo){
    	s.backgroundImage='url('+divsImg.logoImgSrc+')';
    	s.backgroundRepeat='no-repeat';
    	s.backgroundSize=logoSquareCount*size+'px';
    	s.backgroundPosition='-'+(logoIndex%logoSquareCount)*size+'px '+'-'+parseInt(logoIndex/logoSquareCount)*size+'px';
    }
    s.width=size+'px';
    s.height=size+'px';
    s.backgroundColor=color;
    s.position='fixed';
    s.left=positionX+'px';
    s.top=positionY+'px';
    // s.transition='top '+dropTime+'s ease-in';

    imgDiv.onmouseover=divsImg.imgDivOnMouseOver;
    this.divsImg=divsImg;
	this.imgDiv=imgDiv;    
}