$(function () {

  //ページ内スクロール
  var navHeight = $(".header").outerHeight();

  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate({ scrollTop: position, }, 300, "swing");
    return false;
  });

  //ページトップ
  $("#js-page-top").on("click", function () {
    $("body,html").animate({ scrollTop: 0, }, 300);
    return false;
  });

  var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
		canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#EEF6FD']);
        canvasList.push(document.getElementById("waveCanvas2"));
    colorList.push(['#fff']);
            canvasList.push(document.getElementById("waveCanvas3"));
    colorList.push(['#FDEEEE']);
            canvasList.push(document.getElementById("waveCanvas4"));
    colorList.push(['#fff']);
	// 各キャンバスの初期化
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 50;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
		update();
}

function update() {
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
		// 対象のcanvasのコンテキストを取得
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    drawWave(canvas, color[0], 1, 3, 0);//drawWave(canvas, color[0],0.5, 3, 0);とすると透過50%の波が出来る
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
		var context = canvas.contextCache;
    context.fillStyle = color;//塗りの色
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
    context.lineTo(0, canvas.height); //パスをCanvasの左下へ
    context.closePath() //パスを閉じる
    context.fill(); //波を塗りつぶす
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/1.7);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/5;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();
  
//スクロールをしたら1度だけ見出しをフェイドインアップ
$('.fadeInUpTriggerOnceTitle').on('inview', function(event, isInView) {
  if (isInView) {//表示領域に入った時
    $(this).addClass('animate__animated animate__fadeInUp');
  }
});

//スクロールをしたら1度だけフェイドインアップ
$('.fadeInUpTriggerOnce').on('inview', function(event, isInView) {
  if (isInView) {//表示領域に入った時
    $(this).addClass('animate__animated animate__fadeInUp');
  }
});

//スクロールをしたら1度だけフェイドインアップビッグ
$('.fadeInUpBigTriggerOnce').on('inview', function(event, isInView) {
  if (isInView) {//表示領域に入った時
    $(this).addClass('animate__animated animate__fadeInUpBig');
  }
});

//スクロールをしたら1度だけロウテイトインダウンレフト
$('.rotateInDownLeftTriggerOnce').on('inview', function(event, isInView) {
  if (isInView) {//表示領域に入った時
    $(this).addClass('animate__animated animate__rotateInDownLeft animate__delay-1s');
  }
}); 

//スクロールをしたら1度だけロウテイトインダウンレフト
$('.flipTriggerOnce').on('inview', function(event, isInView) {
  if (isInView) {//表示領域に入った時
    $(this).addClass('animate__animated animate__rubberBand animate__delay-1s');
  }
}); 

});