var winH = document.documentElement.clientHeight || document.body.clientHeight,
    winW = document.documentElement.clientWidth || document.body.clientWidth,
    isIe = !-[1,];

var img1 = document.createElement('img');
img1.onload = function () {
    if (isIe) {
        appendImgWithLogo(img1, {
            left: parseInt((winW - winH / 3 * 2) / 3) - 3 + 'px',
            top: parseInt(winH / 3) + 1 + 'px',
            height: parseInt(winH / 3) + 'px',
            width: parseInt(winH / 3) + 'px'
        }, 'img/alipay_logo.png'); ///tools/img/alipay_logo.png
    } else {
        var alipay = new get8bitImgData(img1);
        var alipayDivsImg = new DivsImg({
            id: 'alipayDivsImg',
            childSize: (winH / 3 * 2.2 > winW) ? Math.ceil(winW / 2.3 / alipay.rArray.length) : Math.ceil(winH / 3 /
                alipay.rArray.length),
            lengthX: alipay.rArray[0].length,
            lengthY: alipay.rArray.length,
            posX: (winH / 3 * 2 > winW) ? parseInt((winW - winW / 1.1) / 3) : parseInt((winW - winH / 3 * 2) / 3),
            posY: parseInt(winH / 3),
            dataArr: alipay.rArray,
            color: '#123',
            logoImgSrc: 'img/alipay_logo.png', ///tools/img/alipay_logo.png
            logoLength: 5,
            cd: 1
        });
        document.body.appendChild(alipayDivsImg.divsImg);
        alipayDivsImg.autoBackTurnOn();
    }
}
img1.src = 'img/alipayQRCode.png'; ///tools/img/alipayQRCode.png

var img2 = document.createElement('img');
img2.onload = function () {
    if (isIe) {
        appendImgWithLogo(img2, {
            left: parseInt((winW - winH / 3 * 2) / 3 * 2 + winH / 3) + 'px',
            top: parseInt(winH / 3) + 'px',
            height: parseInt(winH / 3) + 'px',
            width: parseInt(winH / 3) + 'px'
        }, 'img/tenpay_logo.png'); ///tools/img/tenpay_logo.png
    } else {
        var tenpay = new get8bitImgData(img2);
        var tenpayDivsImg = new DivsImg({
            id: 'tenpayDivsImg',
            childSize: (winH / 3 * 2.2 > winW) ? Math.ceil(winW / 2.3 / tenpay.rArray.length) : Math.ceil(winH / 3 /
                tenpay.rArray.length),
            lengthX: tenpay.rArray[0].length,
            lengthY: tenpay.rArray.length,
            posX: (winH / 3 * 2 > winW) ? parseInt((winW - winW / 1.1) / 3 * 2 + winW / 2.2) : parseInt((winW - winH /
                3 * 2) / 3 * 2 + winH / 3),
            posY: parseInt(winH / 3),
            dataArr: tenpay.rArray,
            color: '#123',
            logoImgSrc: 'img/tenpay_logo.png', ///tools/img/tenpay_logo.png
            logoLength: 5,
            cd: 1
        });
        document.body.appendChild(tenpayDivsImg.divsImg);
        tenpayDivsImg.autoBackTurnOn();
    }
}
img2.src = 'img/tenpayQRCode.png'; ///tools/img/tenpayQRCode.png

function appendImgWithLogo(imgElement, lthw, logoSrc) {
    imgElement.style.position = "fixed";
    imgElement.style.left = arguments[1].left;
    imgElement.style.top = arguments[1].top;
    imgElement.style.height = arguments[1].height;
    imgElement.style.width = arguments[1].width;

    var logoDiv = document.createElement('div');
    logoDiv.style.position = imgElement.style.position;
    logoDiv.style.left = imgElement.style.left;
    logoDiv.style.top = imgElement.style.top;
    logoDiv.style.height = imgElement.style.height;
    logoDiv.style.width = imgElement.style.width;
    logoDiv.style.textAlign = 'center';

    var logoImg = document.createElement('img');
    logoImg.src = logoSrc;
    logoImg.style.height = parseInt(imgElement.style.height.replace('px', '') / 7) + 'px';
    logoImg.style.width = parseInt(imgElement.style.width.replace('px', '') / 7) + 'px';
    logoImg.style.background = 'black';
    logoImg.style.marginTop = (logoDiv.style.height.replace('px', '') - logoImg.style.height.replace('px', '')) / 2 +
        'px';

    document.body.appendChild(imgElement);
    logoDiv.appendChild(logoImg);
    document.body.appendChild(logoDiv);
}


//中间字
//var paymentLabel=document.createElement('label');
//document.body.appendChild(paymentLabel);
//paymentLabel.text = "lala";
//paymentLabel.nodeValue = "asdasd";
////paymentLabel.style.background=isIe?'black':'#123';
//paymentLabel.style.height=parseInt(winH/99)*4+'px';
//paymentLabel.style.width=parseInt(paymentLabel.style.height.replace('px','')/80*460)+'px';
//paymentLabel.style.marginLeft=(winW-paymentLabel.style.width.replace('px',''))/2+'px';
//
//if((winW-parseInt(winH/3*2))/3.3<=paymentLabel.style.width.replace('px','')){
//	paymentLabel.style.marginTop=(winH-parseInt(winH/99)*4)/7+'px';
//}else{
//	paymentLabel.style.marginTop=(winH-parseInt(winH/99)*4)/2+'px';
//}