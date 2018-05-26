/**
 * @class get8bitImgData
 * @param {string} imgSrc qrcodeimg.src
 */
function get8bitImgData(img){
    // var img=document.createElement('img');
    // img.src=imgSrc;
    
    var canvas=document.createElement('canvas'),
        // img   =document.createElement('img'),
        ctx   =canvas.getContext('2d'),
        colorDeviation=20, //允许颜色偏差0~255
        rArr=[],
        gArr=[],
        bArr=[],
        aArr=[];
        // obj={};

    // img.onload = function(){
        startToWork();
        compress();
        clearTopOrBottom(0);  //top
        clearTopOrBottom(rArr.length-1);  //bottom
        clearLeftRight();
        // showTodebug();
        // console.log("leni:"+rArr.length);
        // console.log("lenj:"+rArr[0].length);
    // }
    // img.src = imgSrc;

    function startToWork(){
        canvas.height=img.height;
        canvas.width=img.width;
        ctx=canvas.getContext('2d');
        ctx.drawImage(img,0,0);
        var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
        var tArr=[];
        for(var pos=0;pos<4;pos++){
            for(var i=pos,iData=imgData.data,len=iData.length,cw=canvas.width;i<len;i+=4){
                tArr.push(iData[i]);
            }
            if(pos==0){
                //一维转二维
                while(tArr.length){
                    rArr.push(tArr.splice(0,cw));
                }
            }else if(pos==1){
                while(tArr.length){
                    gArr.push(tArr.splice(0,cw));
                }
            }else if(pos==2){
                while(tArr.length){
                    bArr.push(tArr.splice(0,cw));
                }
            }else{
                while(tArr.length){
                    aArr.push(tArr.splice(0,cw));
                }
            }
        }
        imgData=null;
    }

    function showTodebug(){
        for(var i=0,leni=rArr.length;i<leni;i++){
            console.log("leni:"+leni);
            console.log("lenj:"+rArr[0].length);
            for(var j=0,lenj=rArr[0].length;j<lenj;j++){
                document.write(rArr[i][j]==255?"1":"0");
                document.write(",");
            }
            document.write("<br/>");
        }
    }

    function compress(){
        //合并相同行
        for(var i=0;i<rArr.length-1;){
            if(rArr[i].toString()==rArr[i+1].toString()&&
               gArr[i].toString()==gArr[i+1].toString()&&
               bArr[i].toString()==bArr[i+1].toString()&&
               aArr[i].toString()==aArr[i+1].toString()){
                rArr.splice(i+1,1);
                gArr.splice(i+1,1);
                bArr.splice(i+1,1);
                aArr.splice(i+1,1);
            }else{
                i++;
            }
        }
        //合并相同列
        for(var y=0;y<rArr[0].length-1;){
            for(var x=0,len=rArr.length-1,isEqual=true;x<len;x++){
                if(rArr[x][y]!=rArr[x][y+1]||
                   gArr[x][y]!=gArr[x][y+1]||
                   bArr[x][y]!=bArr[x][y+1]||
                   aArr[x][y]!=aArr[x][y+1]){
                    isEqual=false;
                    break;
                }
            }
            if(isEqual){
                for(var x=0,len=rArr.length;x<len;x++){
                    rArr[x].splice(y+1,1);
                    gArr[x].splice(y+1,1);
                    bArr[x].splice(y+1,1);
                    aArr[x].splice(y+1,1);
                }
            }else{
                y++;
            }
        }
    }

    //删除上下空白
    function clearTopOrBottom(pos){
        var rlineStr=rArr[pos].toString()+',',
            glineStr=gArr[pos].toString()+',',
            blineStr=bArr[pos].toString()+',',
            alineStr=aArr[pos].toString()+',';
        if(rlineStr.replace(/255,/g,'')==''&&
           glineStr.replace(/255,/g,'')==''&&
           blineStr.replace(/255,/g,'')==''&&
           alineStr.replace(/255,/g,'')==''){
            rArr.splice(pos,1);
            gArr.splice(pos,1);
            bArr.splice(pos,1);
            aArr.splice(pos,1);
        }
    }
    
    //左右
    function clearLeftRight(){
        for(var y=0;;){
            for(var x=0,len=rArr.length;x<len;x++){
                if(rArr[x][y]!=255||
                   gArr[x][y]!=255||
                   bArr[x][y]!=255||
                   aArr[x][y]!=255){
                    break;
                }
                if(x==len-1){
                    for(var i=0;i<len;i++){
                        rArr[i].splice(y,1);
                        gArr[i].splice(y,1);
                        bArr[i].splice(y,1);
                        aArr[i].splice(y,1);
                    }
                }
            }
            if(y!=rArr[0].length-1){
                y=rArr[0].length-1;
            }else{
                break;
            }
        }
    }  


    this.img=img;
    this.rArray=rArr;
    this.gArray=gArr;
    this.bArray=bArr;
    this.aArray=aArr;
    if(typeof this.getBitArrayString!='function'){
        this.getBitArrayString=function(){
            var str='[';
            for(var i=0,len=this.rArray.length;i<len;i++){
                str+='['+this.rArray[i]+']';
                if(i!=len-1){
                    str+=',\n ';
                }else{
                    str+=']';
                }
            }
            return str;
        }   
    }
}