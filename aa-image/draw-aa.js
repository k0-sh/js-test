/** @type {HTMLCanvasElement} */
let canvas;
let ctx;
let init_aa = "　 ∧＿∧\n　（　´∀｀）\n　（　　　　）\n　｜ ｜　|\n　（_＿）＿）"

window.onload = function() {
    canvas = document.getElementById('textCanvas');
    ctx = canvas.getContext('2d');
    drawAA(init_aa)
}



function generateImage() {
    var dataURL = canvas.toDataURL();
    var outputImage = document.getElementById('outputImage');
    outputImage.src = dataURL;
}

function getText() {
    let text = document.getElementById("aa_text").value
    drawAA(text)
}

function drawAA(text) {
    let fontSize = 16;
    let lineHeight = 1.0;
    let x = 0;
    let y = 0;

    ctx.font = fontSize + 'px aahub_light, sans-serif';

    let lines = text.split("\n");
    let w = 0; //キャンバスの横幅
    let h = fontSize * (lines.length + 1); //キャンバスの縦幅
    let text_len = 0;

    // 一行における最大文字数を求める
    for (lines, i = 0, l=lines.length; l > i; i++) {
        let j = ctx.measureText(lines[i]).width;
        if (text_len < j) text_len = j;
    }
    w = text_len + fontSize
    canvas.width = w;
    canvas.height = h;

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px aahub_light, sans-serif';
    
    // 一行ずつ描画する
    for (lines, i = 0, l=lines.length; l > i; i++) {
        let line = lines[i];
        let addY = fontSize;

        if (i) addY += fontSize * lineHeight * i;
        ctx.fillText(line, x, y + addY);
    }
}

