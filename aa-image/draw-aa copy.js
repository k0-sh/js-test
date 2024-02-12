/** @type {HTMLCanvasElement} */
let canvas;
let ctx;

window.onload = function() {
    canvas = document.getElementById('textCanvas');
    ctx = canvas.getContext('2d');
    //drawText('Hello, World!');

}

function drawText(text) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(text, 5, 20);
}

function generateImage() {
    var dataURL = canvas.toDataURL();
    var outputImage = document.getElementById('outputImage');
    outputImage.src = dataURL;
}

function getText() {
    const text = document.getElementById("aa_text").value;
    var formatText = text.replace(/\n/g, '\n');
    drawText(formatText)
}

function foo() {
    let hoge = document.getElementById("aa_text").value;
    hoge = hoge.replace(/\n/g, '\n');
    document.getElementById("output_n").innerText = hoge;
}

function bar() {
    var text = document.getElementById("aa_text").value;
    var fontSize = 20;
    var lineHeight = 1.0;
    var x = 0;
    var y = 0;
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px aahub_light, Arial';
    let hoge = ctx.measureText(text);
    console.log(hoge.width);
    for (let lines = text.split("\n"), i = 0, l=lines.length; l > i; i++) {
        var line = lines[i];
        var addY = fontSize;

        if (i) addY += fontSize * lineHeight * i;
        ctx.fillText(line, x, y + addY);
    }
}